import { Injectable } from '@nestjs/common';
import { PrismaService } from '@external/database/prisma/prisma.service';
import { Project } from '@app/entities/project/Project';
import { ProjectRepository } from '@app/repositories/project/project-repository';

interface DeleteProjectRequest {
  id: string;
}
interface DeleteProjectResponse {
  project: Project;
}

@Injectable()
export class DeleteProject {
  constructor(
    private projectRepository: ProjectRepository,
    private prismaService: PrismaService,
  ) {}

  async execute(request: DeleteProjectRequest): Promise<DeleteProjectResponse> {
    const project = await this.projectRepository.findById(request.id);

    if (!project) {
      throw new Error('Project not found');
    }
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.projectTag.deleteMany({
        where: { projectId: project.id },
      });

      await prisma.project.delete({
        where: { id: project.id },
      });
    });

    return { project: project };
  }
}
