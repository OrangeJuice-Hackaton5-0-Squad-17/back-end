import { Project } from '../project/Project';
import { Tag } from '../tag/Tag';

interface ProjectTagProps {
  projectId: string;
  tagId: string;
  project?: Project;
  tag?: Tag;
}

export class ProjectTag {
  private props: ProjectTagProps;

  constructor(props: ProjectTagProps) {
    this.props = { ...props };
  }

  public get projectId(): string {
    return this.props.projectId;
  }

  public set projectId(projectId: string) {
    this.props.projectId = projectId;
  }

  public get tagId(): string {
    return this.props.tagId;
  }

  public set tagId(tagId: string) {
    this.props.tagId = tagId;
  }

  public get project(): Project {
    return this.props.project;
  }

  public set project(project: Project) {
    this.props.project = project;
  }

  public get tag(): Tag {
    return this.props.tag;
  }

  public set tag(tag: Tag) {
    this.props.tag = tag;
  }
}
