import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "@app/repositories/project/project-repository";
import { TagRepository } from "@app/repositories/tag/tag-repository";
import { ProjectTagRepository } from "@app/repositories/projectTag/projectTag-repository";
import { Project } from "@app/entities/project/Project";

export interface UpdateProjectRequest {
    id: string;
    title: string;
    link?: string;
    img?: string
    description: string;
    userId: string;
    tags?: string[]
}

@Injectable()
export class UpdateProject {
    constructor(
        private projectRepository: ProjectRepository,
        private tagRepository: TagRepository,
        private projectTagRepository: ProjectTagRepository,
    ) {}

    async execute(request: UpdateProjectRequest): Promise<void> {
        // const { title, link, description, userId, img, tags } = request;

        // const project = new Project({
        //     title,
        //     link,
        //     description,
        //     userId,
        //     img
        // });
        // if (tags) {
        //     //Delete all previous tags
        //     await this.projectTagRepository.deleteMany(request.id);

        //     //Create new tags
        //     for (const tagName of tags) {
        //         let tag = await this.tagRepository.findUnique(tagName);

        //         if (!tag) {
        //             tag = await this.tagRepository.createTag(tagName);
        //         }

        //         await this.projectTagRepository.create(request.id, tag.id);
        //     }
        // }
        // await this.projectRepository.update(project);
        
 }
}
    