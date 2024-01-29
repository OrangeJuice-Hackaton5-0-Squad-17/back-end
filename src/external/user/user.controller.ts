import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/external/prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateUserBody } from './create-user-body';

@Controller('user')
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getUsers() {
    return this.prisma.user.findMany();
  }

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;
    await this.prisma.user.create({
        data:{
            id: randomUUID(),
            name,
            email,
            password
        }
    });
  }
}
