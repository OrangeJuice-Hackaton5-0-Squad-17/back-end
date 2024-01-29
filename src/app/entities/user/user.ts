import { Replace } from "src/helpers/Replace";
import { Email } from "./validations/user.email.validation";

interface UserProps {
    name: string;
    email: Email;
    password: string;
    created_at: Date;
    updated_at?: Date | null; 
  }

export class User {
    private props: UserProps;

    constructor(props: Replace<UserProps, { created_at?: Date }>) {
        this.props = {
            ...props,
            created_at: props.created_at ?? new Date(),
        };
    }

    public set name(name: string){
        this.props.name = name;
    }

    public get name(): string{
      return this.props.name;
    }

    public set email(email: Email){
        this.props.email = email;
    }
    
    public get email(): Email{
      return this.props.email;
    }

    public set password(password: string){
        this.props.password = password;
    }
    
    public get password(): string{
      return this.props.password;
    }

    public get created_at(): Date{
        return this.props.created_at;
      }

      public set updated_at(updated_at: Date | null | undefined){
        this.props.updated_at = updated_at;
    }
    
    public get updated_at(): Date | null | undefined{
      return this.props.updated_at;
    }
}