import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  private prisma = new PrismaClient();

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        title: createProjectDto.title,
        link: createProjectDto.link,
        description: createProjectDto.description,
        userId: createProjectDto.userId,
      }
    })

    if (createProjectDto.tags) {
      for (const tagName of createProjectDto.tags) {
        const tag = await this.prisma.tag.upsert({
          where: {name : tagName},
          update: {},
          create: {name: tagName}
        })
        await this.prisma.projectTag.create({
          data: {
            projectId: project.id,
            tagId: tag.id
          }
        })
      }        
    }
    return project;
  }

}
