import { Project } from "src/app/entities/project/project";
import { ProjectRepository } from "src/app/repositories/project/project-repository";
import { PrismaService } from "src/external/database/prisma/prisma.service";
import { TagRepository } from "src/app/repositories/tag/tag-repository";
import { Tag } from "src/app/entities/tag/tag";
import { ProjectTagRepository } from "src/app/repositories/projectTag/projectTag-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(
    private prisma: PrismaService,
    private tagRepository: TagRepository,
    private projectTagRepository: ProjectTagRepository,
  ) {}

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
        const tag = await this.tagRepository.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName }
        });
        await this.projectTagRepository.create(projectData.id, tag.id);
      }
    }
    return;
  }
}