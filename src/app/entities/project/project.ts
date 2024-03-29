import { User } from 'src/app/entities/user/user';
import { randomUUID } from 'crypto';
import { ProjectTag } from '../projectTag/projectTag';
import { Replace } from 'src/helpers/Replace';

interface ProjectProps {
  title: string;
  link?: string;
  description: string;
  userId: string;
  img?: string;
  created_at: Date;
  updated_at?: Date | null;
}

export class Project {
  private _id: string;
  private props: ProjectProps;

  constructor(props: Replace<ProjectProps, { created_at?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }
  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get link(): string {
    return this.props.link;
  }

  public set link(link: string) {
    this.props.link = link;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get img(): string {
    return this.props.img;
  }

  public set img(img: string) {
    this.props.img = img;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date | null | undefined {
    return this.props.updated_at;
  }

  public set updated_at(updated_at: Date | null | undefined) {
    this.props.updated_at = updated_at;
  }
}
