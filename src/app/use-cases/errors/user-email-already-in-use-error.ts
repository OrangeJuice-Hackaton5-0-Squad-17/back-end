export class UserEmailAlreadyInUse extends Error {
    constructor() {
        super('This email is already in use.')
    }
}