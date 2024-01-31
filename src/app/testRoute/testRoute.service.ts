import { Injectable } from "@nestjs/common";
import { TestService } from "./testRoute.service.interface";
@Injectable()
export class TestRoute implements TestService {
    testMessage(): string {
        return 'Back-End up and Running!!!';
    }
}