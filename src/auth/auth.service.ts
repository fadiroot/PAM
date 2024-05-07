/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {
    constructor(
        private prisma : PrismaService,
        private jwtService : JwtService,
        private config : ConfigService
    ){}
    async signup(dto:AuthDto){
        try{
            const hash = await argon.hash(dto.password)
            const user = await this.prisma.user.create({
                data:{
                email : dto.email,
                firstName :dto.firstName,
                lastName:dto.lastName,
                hash
                }
            
            })
            delete user.hash

            return user

        }catch(error){
            console.log(error)
            if (error instanceof PrismaClientKnownRequestError){
                if (error.code = 'P2002'){
                    throw new ForbiddenException('Condentials taken')
                }
            }
            throw error
        }    
    }


    async signin(dto:AuthDto){
  
            const user = await this.prisma.user.findUnique({
                where : {
                    email:dto.email
                }
            })
            //user not exist
            if (!user){
                throw new ForbiddenException ('Credentials incorrect')
            }

            //compare password
            const pwMatches = await argon.verify(user.hash,dto.password)
            if (!pwMatches){
                throw new ForbiddenException('Credentials incorrect')
            }

            delete user.hash
            return this.signToken(user.id , user.email)
    }


    async signToken(
        userId: number,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
          email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwtService.signAsync(
          payload,
          {
            expiresIn: '15m',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
      }


    }
    
    

