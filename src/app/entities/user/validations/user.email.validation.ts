// this is an example to custom specific validation / formating!

export class Email {
    private readonly email: string;

    get value(): string {
        return this.email;
    }

    private validateEmailLength(email: string): boolean {
        return email.length >= 6 && email.length <= 240;
    }

    constructor(email: string) {
        const isEmailLenghtValid = this.validateEmailLength(email);

        if (!isEmailLenghtValid) {
            throw new Error('The email length must be greater than 6 and less than 240 characters.');
        }
        this.email = email;
    }
}