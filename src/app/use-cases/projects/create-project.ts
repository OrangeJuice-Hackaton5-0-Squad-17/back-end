import { Injectable } from '@nestjs/common';
import { ProjectRepository } from 'src/app/repositories/project/project-repository';
import { Project } from 'src/app/entities/project/project';
import { TagRepository } from 'src/app/repositories/tag/tag-repository';
import { Tag } from 'src/app/entities/tag/tag';
import { ProjectTagRepository } from 'src/app/repositories/projectTag/projectTag-repository';
import { UpsertTagOptions } from 'src/app/repositories/tag/tag-repository';

interface CreateProjectRequest {
  title: string;
  link: string;
  tags: string[];
  description: string;
  userId: string;
}
interface CreateProjectResponse {
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
    const { title, link, description, userId, tags } = request;

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


