import { ProjectRepository } from "@app/repositories/project/project-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { Project } from "@app/entities/project/project";


@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(
    private prisma: PrismaService,
  ) {}
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(project: Project): Promise<void> {
    const projectData = await this.prisma.project.create({
      data: {
        title: project.title,
        link: project.link,
        description: project.description,
        userId: project.userId,
      },
    });

    if (project.tags) {
      for (const tagName of project.tags) {
        const tag = await this.prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName }
        });
        const newProjectTag = { 
          projectId: projectData.id,
          tagId: tag.id,

         }
        await this.prisma.projectTag.create({ data: newProjectTag });
      }
    }
    return;
  }

  async update(project: Project): Promise<void> {
    
  }
  async findById(id: string): Promise<Project | null> {
    return null;
  }
}