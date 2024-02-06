
import { Project } from "@app/entities/project/Project";
import { Tag } from "@app/entities/tag/Tag";
import { Project as RawProject, Tag as RawTag } from "@prisma/client";

export class PrismaProjectMapper {
    static toPrisma(project: Project) {
      return {
        id: project.id,
        title: project.title,
        link: project.link,
        img: project.img,
        description: project.description,
        userId: project.userId
      };
    }

    static toDomain(raw: RawProject) {
      return new Project({
        title: raw.title,
        link: raw.link,
        description: raw.description,
        userId: raw.userId,
        img: raw.img,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      });
    }

    static tagToPrisma(tag: Tag) {
      return {
        name: tag.name
      }
    }
}

