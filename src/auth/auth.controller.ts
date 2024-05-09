/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto , signUpDto } from './dto';
@Controller("auth")
export class AuthController {
    constructor(private authService : AuthService ){
    }
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body() dto:signUpDto){
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto:signInDto){
        return this.authService.signin(dto)
    }

}