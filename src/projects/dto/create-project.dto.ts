export class CreateProjectDto {
  readonly title: string;
  readonly tags: string[];
  readonly link: string;
  readonly description: string;
  readonly userId: string;
}