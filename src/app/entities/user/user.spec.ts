import { User } from "./user"
import { Email } from "./validations/user.email.validation";

describe('User', () => {
    it('should be able to create an user.', () => {
        const email = new Email('teste@teste.com');
        const user = new User({
            name: 'Marcos',
            email,
            password: '12345678'
        })
        expect(user).toBeTruthy();
    });
});

