/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable, ForbiddenException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { EditProjectDto } from './dto/edit-project.dtos';
@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async getProject(userId: number) {
    return this.prisma.project.findMany({
      where: {
        OR: [
          {
            creatorId: userId,
          },
          {
            users: {
              some: {
                id: userId,
              },
            },
          },
        ],
      },
      include: {
        users: true,
      },
    });
  }
  async createProject(id: number, dto: CreateProjectDto) {
    try {
      const project = await this.prisma.project.create({
        data: {
          title: dto.title,
          progress: dto.progress,
          creatorId: id,
          users: {
            // Map the array of userIds to an array of user objects
            connect: dto.users?.map((userId) => ({ id: userId })),
          },
        },
        include: {
          users: true, // Include users in the response
        },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }
  async editProjectById(
    userId: number,
    projectId: number,
    dto: EditProjectDto,
  ) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!project) {
      throw new ForbiddenException('This project Not exist !', '404');
    }
    const usersOfProject = project.users;
    console.log(usersOfProject, 'users of project');
    const isCreator = project.creatorId === userId;
    const isUserIdPresent = usersOfProject.some((user) => user.id === userId);

    if (!isCreator && !isUserIdPresent) {
      throw new ForbiddenException('Not permission to Update!', '403');
    }
    return this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        title: dto.title,
        progress: dto.progress,
        users: {
          // Map the array of userIds to an array of user objects
          connect: dto.users?.map((userId) => ({ id: userId })),
        },
      },
      include: {
        users: true, // Include users in the response
      },
    });
  }
  async deleteProject( userId: number,projectId: number){
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!project) {
      throw new ForbiddenException('This project Not exist !', '404');
    }
    const usersOfProject = project.users;
    const isCreator = project.creatorId === userId;
    const isUserIdPresent = usersOfProject.some((user) => user.id === userId);

    if (!isCreator && !isUserIdPresent) {
      throw new ForbiddenException('Not permission to Update!', '403');
    }
    return this.prisma.project.delete({
      where: {
        id: projectId,
      }})



    }
}
