/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { EditProjectDto } from './dto/edit-project.dtos';
@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}
  @UseGuards(JwtGuard)
  @Get()
  getMe(@GetUser('id') id: number) {
    return this.projectService.getProject(id);
  }
  @UseGuards(JwtGuard)
  @Post('create')
  createProject(@GetUser('id') id: number, @Body() dto: CreateProjectDto) {
    return this.projectService.createProject(id, dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  editProject(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId,
    @Body() dto: EditProjectDto,
  ) {
    return this.projectService.editProjectById(userId, projectId, dto);
  }
}
