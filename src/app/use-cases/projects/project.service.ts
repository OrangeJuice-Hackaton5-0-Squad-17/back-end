import { Injectable } from "@nestjs/common";
import { CreateProject, CreateProjectRequest, CreateProjectResponse } from "./create-project";
import { GetProjectById, ReadProjectsRequest, ReadProjectsResponse } from "./read-project";
import { UpdateProject, UpdateProjectRequest } from "./update-project";

@Injectable()
export class ProjectService {
    constructor(
        private createProject: CreateProject,
        private getProjectById: GetProjectById,
        private updateProject: UpdateProject
    ) {}

    async create(request: CreateProjectRequest): Promise<CreateProjectResponse> {
        return await this.createProject.execute(request);
    }

    async update(request: UpdateProjectRequest): Promise<void> {
        return await this.updateProject.execute(request);
    }

    async getById(request: ReadProjectsRequest): Promise<ReadProjectsResponse> {
        return await this.getProjectById.execute(request);
    }
}