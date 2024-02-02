import { Project } from "src/app/entities/project/project";

export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
  abstract update(project: Project): Promise<void>;
  // abstract findById(id: string): Promise<Project | undefined>;
  // abstract list(): Promise<Project[]>;
  // abstract delete(id: string): Promise<void>;
  // abstract findByUserId(userId: string): Promise<Project[]>;
}