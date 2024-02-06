import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { GetUserById } from "./get-user-by-id";
import { CreateUser } from "./create-user";
import { User } from "@app/entities/user/user";

describe('use-cases-get-user-by-id', () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    const getUser = new GetUserById(userRepository);
    let createdUser: User;

    beforeAll(async () => {
        const { user } = await createUser.execute({
            name: 'Marcos',
            email: 'teste@teste.com',
            password: '12345678'
        });
        createdUser = user;
    })

    it('should be able to get user by user id.', async () => {
        const { user } = await getUser.execute({
            id: createdUser.id
        });
        expect(user).toEqual(createdUser);
    });
    it('should not be able to get user with nonexistent id.', async () => {

        const nonexistentID = async () => {
            await getUser.execute({
                id: 'fake-id',
            });
        };
    
        await expect(nonexistentID()).rejects.toThrow('User not found.');
    });
});

