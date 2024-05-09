/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TesksService } from './tasks/tesks.service';
@Module({
  imports: [
    ConfigModule.forRoot({}),

    AuthModule, 
    PrismaModule,  ProjectsModule, TasksModule, 
    ],
  controllers: [UserController],
  providers: [TesksService],
})
export class AppModule {}
