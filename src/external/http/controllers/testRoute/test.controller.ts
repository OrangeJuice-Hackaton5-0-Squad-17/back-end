import { Controller, Get } from '@nestjs/common';
import { TestService } from '@app/testRoute/testRoute.service.interface';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@app/auth/decorators/is-public.decorator';
@ApiTags('testRoute')
@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}
  @IsPublic()
  @Get('test')
  getTestMessage(): string {
    return this.testService.testMessage();
  }
}
