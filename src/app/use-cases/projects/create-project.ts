import { Project } from "@app/entities/project/Project";
import { ProjectRepository } from "@app/repositories/project/project-repository";
import { ProjectTagRepository } from "@app/repositories/projectTag/projectTag-repository";
import { TagRepository, UpsertTagOptions } from "@app/repositories/tag/tag-repository";
import { Injectable } from "@nestjs/common";


export interface CreateProjectRequest {
  title: string;
  link?: string;
  tags: string[];
  description: string;
  userId: string;
  img?: string;
}
export interface CreateProjectResponse {
  project: Project;
}

@Injectable()
export class CreateProject {
  constructor(
    private projectRepository: ProjectRepository,
    private tagRepository: TagRepository,
    private projectTagRepository: ProjectTagRepository,
  ) {}

  async execute(request: CreateProjectRequest): Promise<CreateProjectResponse> {
    const { title, link, description, userId, tags, img } = request;

    const project = new Project({
      title,
      link,
      description,
      userId,
      user: null,
      tags: [],
      projectTags: [],
      created_at: new Date(),
      updated_at: null,
      img
    });

    await this.projectRepository.create(project);

    if (tags) {
        for (const tagName of tags) {
            const tag = await this.tagRepository.upsert({where: {name: tagName}, update: {}, create: {name: tagName}} as UpsertTagOptions);
            await this.projectTagRepository.create(project.id, tag.id);
        }
    }

    return {
      project,
    };
  }
}


