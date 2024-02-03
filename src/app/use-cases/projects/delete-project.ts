import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external/database/prisma/prisma.service';
import { ProjectRepository } from 'src/app/repositories/project/project-repository';
import { Project } from 'src/app/entities/project/project';

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
