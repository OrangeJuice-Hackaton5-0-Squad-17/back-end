import { IsPublic } from "@app/auth/decorators/is-public.decorator";
import { ProjectService } from "@app/use-cases/projects/project.service";
import { CreateProjectDto } from "@external/http/dtos/project/create-project.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }
  @IsPublic()
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    await this.projectService.create(createProjectDto);
    return {
      createProjectDto
    }
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //     return this.projectService.update(id, updateProjectDto);
  //   }

  //   @Get()
  //   findAll() {
  //     return this.projectService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.projectsService.findOne(id);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.projectsService.remove(id);
  //   }
}