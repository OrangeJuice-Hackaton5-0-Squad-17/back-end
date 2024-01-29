import { Controller, Get } from '@nestjs/common';
import { TestService } from 'src/app/testRoute/testRoute.service.interface';


@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getTestMessage(): string {
    return this.testService.testMessage();
  }
}
