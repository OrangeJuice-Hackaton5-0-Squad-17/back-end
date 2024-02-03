import { Project } from "src/app/entities/project/project";

export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
  abstract update(project: Project): Promise<void>;
  abstract findById(id: string): Promise<Project | null>;
  abstract delete(id: string): Promise<void>;
  // abstract list(): Promise<Project[]>;
  // abstract findByUserId(userId: string): Promise<Project[]>;
}