import { User } from "src/app/entities/user/user";
import { UserRepository } from "./../../../../app/repositories/user-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prismaService: PrismaService) {}
    async create(user: User): Promise<void> {
        await this.prismaService.user.create({
            data:{
                id: user.id,
                name: user.name,
                email: user.email.value,
                password: user.password
            }
        });
    }
}