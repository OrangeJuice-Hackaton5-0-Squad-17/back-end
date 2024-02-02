import { User } from "src/app/entities/user/user";
import { UserRepository } from "@app/repositories/user-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prismaService: PrismaService) {}
    async findById(id: string): Promise<User> {
        const foundUser = await this.prismaService.user.findUnique({ where: { id } });
        if (!foundUser) {
            return null
        }
        return PrismaUserMapper.toDomain(foundUser);
    }
    async update(user: User): Promise<void> {
        const rawUser = PrismaUserMapper.toPrisma(user);
        await this.prismaService.user.update({ where: { id: rawUser.id }, data: rawUser });
        return;
    }
    async findByEmail(email: string): Promise<User | null> {
        const foundUser = await this.prismaService.user.findUnique({ where: { email} });
        if (!foundUser) {
            return null
        }
        return PrismaUserMapper.toDomain(foundUser);
    }
    async create(user: User): Promise<void> {
        const rawUser = PrismaUserMapper.toPrisma(user);
        await this.prismaService.user.create({
            data: rawUser
        });
        return;
    }
}