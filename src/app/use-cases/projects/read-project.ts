import { Project } from "@app/entities/project/Project";
import { ProjectRepository } from "@app/repositories/project/project-repository";
import { Injectable } from "@nestjs/common";

export interface ReadProjectsRequest {
  id: string;
}
export interface ReadProjectsResponse {
  projects: Project;
}

@Injectable()
export class GetProjectById {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(request: ReadProjectsRequest): Promise<ReadProjectsResponse> {
    const project = await this.projectRepository.findById(request.id);
    return { projects: project };
  }
}