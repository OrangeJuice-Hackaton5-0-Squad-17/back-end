export class EmailOrPasswordIncorrect extends Error {
    constructor() {
        super('Incorrect email or password provided.');
    }
}