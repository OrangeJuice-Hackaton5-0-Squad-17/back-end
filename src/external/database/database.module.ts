import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "../../app/repositories/user/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/user/prisma-user-repository";

@Module({
    imports: [],
    providers: [
        PrismaService,
    {
        provide: UserRepository,
        useClass: PrismaUserRepository
    },
],
exports: [
    UserRepository,
    PrismaService
]
})
export class DatabaseModule {}