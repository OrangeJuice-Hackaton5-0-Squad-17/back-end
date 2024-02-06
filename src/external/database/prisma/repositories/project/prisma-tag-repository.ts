import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { TagRepository } from "@app/repositories/tag/tag-repository";
import { PrismaProjectMapper } from "../../mappers/project/prisma-project-mapper";
import { Tag } from "@app/entities/tag/Tag";

interface CreatedTag {
  tag: Tag
}

@Injectable()
export class PrismaTagRepository implements TagRepository {
  constructor(
    private prisma: PrismaService,
  ) {}
    async createTag(tag: Tag): Promise<any> {
        const rawTag = PrismaProjectMapper.tagToPrisma(tag);
        console.log('o que vem aqui ? ', rawTag)
      const createdTag = await this.prisma.tag.upsert({ where: { name: rawTag.name }, update: {}, create: { name: rawTag.name } });
      console.log('qual a tag criada? ', createdTag)
      return {
        createdTag: createdTag
      }
    }
    findUnique(name: string): Promise<Tag> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Tag> {
        throw new Error("Method not implemented.");
    }

}