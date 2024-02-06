import { Tag } from "src/app/entities/tag/Tag";


export abstract class TagRepository {
  abstract createTag(tag: Tag): Promise<any>;
  abstract findUnique(name: string): Promise<Tag>;
  abstract findById(id: string): Promise<Tag | null>;
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
