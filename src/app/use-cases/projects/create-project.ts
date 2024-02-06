import { Project } from "@app/entities/project/Project";
import { Tag } from "@app/entities/tag/Tag";
import { ProjectRepository } from "@app/repositories/project/project-repository";
import { ProjectTagRepository } from "@app/repositories/projectTag/projectTag-repository";
import { TagRepository } from "@app/repositories/tag/tag-repository";
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
      img,
      created_at: new Date()
    });

   const newProject = await this.projectRepository.create(project);

    if (tags) {
        for (const tagName of tags) {
          const newTag = new Tag({
            name: tagName
          })
           const tag = await this.tagRepository.createTag(newTag);

            await this.projectTagRepository.create(newProject.CreatedProject.id, tag.createdTag.id)
        }
    }

    return {
      project,
    };
  }
}


