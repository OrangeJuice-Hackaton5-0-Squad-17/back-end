import { User } from "src/app/entities/user/user";
import { UserRepository } from "@app/repositories/user-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prismaService: PrismaService) {}
    async findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async create(user: User): Promise<void> {
        const rawUser = PrismaUserMapper.toPrisma(user);
        await this.prismaService.user.create({
            data: rawUser
        });
    }
}