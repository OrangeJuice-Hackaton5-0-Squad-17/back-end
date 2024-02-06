import { ProjectTag } from "src/app/entities/projectTag/projectTag";

export abstract class ProjectTagRepository {
  abstract create(projectId: string, tagId: string): Promise<void>;
  abstract deleteMany(projectId: string): Promise<void>;
}














// import { Inject, Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma.service';
// import { ProjectTag } from 'src/app/entities/projectTag/ProjectTag';
// import { ProjectRepository } from 'src/app/repositories/project/project-repository';
// import { TagRepository } from 'src/app/repositories/project/tag-repository';

// @Injectable()
// export class ProjectTagRepository {
//   constructor(
//     private prisma: PrismaService,
//     private projectRepository: ProjectRepository,
//     private tagRepository: TagRepository,
//   ) {}

//   async create(projectId: string, tagId: string): Promise<ProjectTag> {
//     const project = await this.projectRepository.findById(projectId);
//     const tag = await this.tagRepository.findById(tagId);

//     if (!project || !tag) {
//       throw new Error('Project or Tag not found');
//     }

//     await this.prisma.projectTag.create({
//       data: {
//         projectId,
//         tagId
//       }
//     })

//     return new ProjectTag({ projectId, tagId, project, tag });
//   }
// }
