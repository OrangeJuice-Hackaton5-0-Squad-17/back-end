import { makeUser } from "@test/factories/user/create-user-factory";
import { User } from "./user"
import { Email } from "./validations/user.email.validation";

describe('User', () => {
    it('should be able to create an user.', () => {
        const user = new User(makeUser({ password: '12395178' }));
        expect(user).toBeTruthy();
    });
});

