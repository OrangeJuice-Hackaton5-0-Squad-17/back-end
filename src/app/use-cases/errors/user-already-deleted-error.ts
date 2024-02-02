export class UserAlreadyDeleted extends Error {
    constructor() {
        super('This user has already been deleted.');
    }
}