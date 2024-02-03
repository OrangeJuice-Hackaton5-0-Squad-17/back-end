import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "src/app/repositories/project/project-repository";
import { Project } from "src/app/entities/project/project";

export interface ReadProjectsRequest {
  id: string;
}
interface ReadProjectsResponse {
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