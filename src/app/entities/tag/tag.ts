import { Replace } from 'src/helpers/Replace';
import { randomUUID } from 'crypto';
import { ProjectTag } from '../projectTag/projectTag';

export interface TagProps {
  name: string;
  created_at?: Date;
  updated_at?: Date | null;
}

export class Tag {
  private _id: string;
  private props: TagProps;

  constructor(props: Replace<TagProps, { created_at?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public set updated_at(updated_at: Date | null | undefined) {
    this.props.updated_at = updated_at;
  }

  public get updated_at(): Date | null | undefined {
    return this.props.updated_at;
  }
}
