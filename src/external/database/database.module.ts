import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "src/app/repositories/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";

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
    UserRepository
]
})
export class DatabaseModule {}