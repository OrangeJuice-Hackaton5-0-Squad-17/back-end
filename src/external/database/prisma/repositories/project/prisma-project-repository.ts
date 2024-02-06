import { ProjectRepository } from "@app/repositories/project/project-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { Project } from "@app/entities/project/project";
import { PrismaProjectMapper } from "../../mappers/project/prisma-project-mapper";


@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(
    private prisma: PrismaService,
  ) {}
  async findAllByUserId(userId: string): Promise<any> {
   const projects = await this.prisma.project.findMany({ where: { userId } });

   console.log('como vem projetos? ', projects)
   const userProjects = [];

  for (let x in projects) {
    console.log('x', x)
    console.log( 'project ', projects)

    const tags = await this.prisma.projectTag.findMany({ where: { projectId: projects[x].id } });

    const tagsArr = [];
    
    for (let z in tags) {
      const foundTag = await this.prisma.tag.findFirst({ where: { id: tags[z].tagId } });
      tagsArr.push(foundTag.name)
    }
    const tempProject = {
          ...projects[x],
          tags: tagsArr
        }
        userProjects.push(tempProject)
  }

   return {
    userProjects
   }

  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(project: Project): Promise<any> {

    const RawProjectData = PrismaProjectMapper.toPrisma(project)

    const createdProject = await this.prisma.project.create({ data: RawProjectData });

    return {
      CreatedProject: createdProject
    }
    
  }

  async update(project: Project): Promise<void> {
    
  }
}