import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { TagRepository } from "@app/repositories/tag/tag-repository";
import { PrismaProjectMapper } from "../../mappers/project/prisma-project-mapper";
import { Tag } from "@app/entities/tag/Tag";
import { ProjectTagRepository } from "@app/repositories/projectTag/projectTag-repository";


@Injectable()
export class PrismaProjectTagRepository implements ProjectTagRepository {
  constructor(
    private prisma: PrismaService,
  ) {}
    async create(projectId: string, tagId: string): Promise<void> {
      const newProjectTag = {
        projectId,
        tagId
      }
      console.log(' qual a tagProject vindo? ', newProjectTag)
        await this.prisma.projectTag.create({ data: newProjectTag });
    }
    deleteMany(projectId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


}