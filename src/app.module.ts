/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
@Module({
  imports: [
    ConfigModule.forRoot({}),

    AuthModule, 
    PrismaModule, 
    ],
  controllers: [UserController],
})
export class AppModule {}
