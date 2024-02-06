import { DatabaseModule } from "@external/database/database.module";
import { Module } from "@nestjs/common";
import { CreateProject } from "./create-project";
import { GetProjectById } from "./read-project";
import { UpdateProject } from "./update-project";
import { ProjectService } from "./project.service";
import { PrismaService } from "@external/database/prisma/prisma.service";
import { ProjectController } from "@external/http/controllers/project/project.controller";
import { TagRepository } from "@app/repositories/tag/tag-repository";


@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [
    CreateProject,
    GetProjectById,
    UpdateProject,
    ProjectService,
    
  ],
  exports: [
    CreateProject,
    GetProjectById,
    UpdateProject,
    ProjectService
  ]
  
})
export class ProjectModule {}
