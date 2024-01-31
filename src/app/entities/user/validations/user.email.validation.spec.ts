import { Email } from "./user.email.validation";

describe('Email', () => {
    it('should Not be able to create email with unvalid length.', () => {
        expect(() => new Email('a'.repeat(5))).toThrow();
    });
    it('should Not be able to create an user with unvalid email type.', () => {
        expect(() => new Email('marcsda')).toThrow('The email must be a valid email address.');
    });
});