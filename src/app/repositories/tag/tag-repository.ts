import { Tag } from "src/app/entities/tag/Tag";

export interface UpsertTagOptions {
  where: { name: string };
  update: {};
  create: { name: string };
}

export abstract class TagRepository {
  abstract upsert(option: UpsertTagOptions): Promise<Tag>;
  abstract findUnique(name: string): Promise<Tag>;
  abstract findById(id: string): Promise<Tag | null>;
  abstract create(name: string): Promise<Tag>;
}














// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma.service';
// import { Tag } from 'src/app/entities/tag/tag';

// @Injectable()
// export class TagRepository {
//   constructor(private prisma: PrismaService) {}

//   async findById(id: string): Promise<Tag | null> {
//     const tagData = await this.prisma.tag.findUnique({
//       where: { id },
//     });
//     return tagData ? new Tag({ ...tagData, projectTags: [] }) : null;
//   }

//   async create(name: string): Promise<Tag> {
//     const tagData = await this.prisma.tag.create({
//       data: {
//         name,
//       },
//     });
//     return new Tag({ ...tagData, projectTags: [] });
//   }
// }
