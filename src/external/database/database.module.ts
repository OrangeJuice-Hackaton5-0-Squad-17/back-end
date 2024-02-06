import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "@app/repositories/user/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/user/prisma-user-repository";
import { TagRepository } from "@app/repositories/tag/tag-repository";
import { PrismaProjectRepository } from "./prisma/repositories/project/prisma-project-repository";
import { ProjectRepository } from "@app/repositories/project/project-repository";
import { ProjectTagRepository } from "@app/repositories/projectTag/projectTag-repository";
import { PrismaTagRepository } from "./prisma/repositories/project/prisma-tag-repository";
import { PrismaProjectTagRepository } from "./prisma/repositories/project/prisma-projectTag-repository";


@Module({
    imports: [],
    providers: [
        PrismaService,
    {
        provide: UserRepository,
        useClass: PrismaUserRepository
    },
    {
        provide: TagRepository,
        useClass: PrismaTagRepository
    },
    {
        provide: ProjectRepository,
        useClass: PrismaProjectRepository
    },
    {
        provide: ProjectTagRepository,
        useClass: PrismaProjectTagRepository
    },
],
exports: [
    UserRepository,
    PrismaService,
    TagRepository,
    ProjectRepository,
    ProjectTagRepository
]
})
export class DatabaseModule {}