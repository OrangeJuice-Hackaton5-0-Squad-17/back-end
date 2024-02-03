import { Project as DomainProject } from "src/app/entities/project/project";
import { Project as PrismaProject, Tag as PrismaTag } from "@prisma/client";

export class PrismaProjectMapper {
    static toPrisma(project: DomainProject): PrismaProject {
      return {
        id: project.id,
        title: project.title,
        link: project.link,
        description: project.description,
        userId: project.userId,
        created_at: new Date(),
        updated_at: new Date(),
      };
    }

    static toDomain(prismaProject: PrismaProject, tags: PrismaTag[]): DomainProject {
      return new DomainProject({
        title: prismaProject.title,
        link: prismaProject.link,
        description: prismaProject.description,
        userId: prismaProject.userId,
        user: null,
        tags: tags.map(tag => tag.name),
        projectTags: [], 
        created_at: prismaProject.created_at,
        updated_at: prismaProject.updated_at,
      });
    }
}

