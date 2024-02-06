import { Project } from "src/app/entities/project/project";

export abstract class ProjectRepository {
  abstract create(project: Project): Promise<any>;
  abstract update(project: Project): Promise<void>;
  abstract findAllByUserId(userId: string): Promise<any>;
  abstract delete(id: string): Promise<void>;
  // abstract list(): Promise<Project[]>;
  // abstract findByUserId(userId: string): Promise<Project[]>;
}