import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

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

  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    const updatedProject = await this.prisma.project.update({
      where: {id: projectId},
      data: {
        title: updateProjectDto.title,
        link: updateProjectDto.link,
        description: updateProjectDto.description,
      }
    })
    if (updateProjectDto.tags) {
      //Remover todas as associações de tags existentes
      await this.prisma.projectTag.deleteMany({
        where: { projectId: projectId },
      });

      //Associar novas tags
      for (const tagName of updateProjectDto.tags) {
        let tag = await this.prisma.tag.findUnique({
          where: { name: tagName },
        });

        if (!tag) {
          tag = await this.prisma.tag.create({
            data: { name: tagName },
          });
        }

        await this.prisma.projectTag.create({
          data: {
            projectId: projectId,
            tagId: tag.id,
          },
        });
      
      }
  }
    return updatedProject;
 }

 async findAll() {
  return this.prisma.project.findMany({
    include: {
      projectTags: {
        include: {
          tag: true
        }
      }
    }
  })
 }

 async findOne(id: string) {
  return this.prisma.project.findUnique({
    where: {id: id},
    include: {
      projectTags: {
        include: {
          tag: true
        }
      }
    }
  })
 }

 async remove(id: string) {
  await this.prisma.projectTag.deleteMany({
    where: { projectId: id },
  });
  await this.prisma.project.delete({
    where: { id: id },
  });
  }
   
}
