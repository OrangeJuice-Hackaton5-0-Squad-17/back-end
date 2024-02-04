import { Controller, Get } from '@nestjs/common';
import { TestService } from '@app/testRoute/testRoute.service.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('testRoute')
@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('test')
  getTestMessage(): string {
    return this.testService.testMessage();
  }
}
