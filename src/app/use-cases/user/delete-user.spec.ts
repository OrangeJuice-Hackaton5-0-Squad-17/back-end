import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { GetUserById } from "./get-user-by-id";
import { CreateUser } from "./create-user";
import { User } from "@app/entities/user/user";
import { DeleteUserById } from "./delete-user";

describe('use-cases-delete-user-by-id', () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    const getUser = new GetUserById(userRepository);
    const deleteUser = new DeleteUserById(userRepository);
    let createdUser: User;

    beforeAll(async () => {
        const { user } = await createUser.execute({
            name: 'Marcos',
            email: 'teste@teste.com',
            password: '12345678'
        });
        createdUser = user;
    })

    it('should be able to delete an user by id.', async () => {
        await deleteUser.execute({
            id: createdUser.id
        });

        const { user } = await getUser.execute({
            id: createdUser.id
        });

        expect(user.deleted_at instanceof Date).toBe(true);
    });
    it('should not be able to delete user with nonexistent id.', async () => {

        const nonexistentID = async () => {
            await deleteUser.execute({
                id: 'fake-id',
            });
        };
    
        await expect(nonexistentID()).rejects.toThrow('User not found.');
    });

    it('should not be able to delete an deleted user.', async () => {

        const tryDeleteSameUser = async () => {
            await deleteUser.execute({
                id: createdUser.id,
            });
        };
    
        await expect(tryDeleteSameUser()).rejects.toThrow('This user has already been deleted.');
    });
});

