import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { CreateUser } from "./create-user";
import { User } from "@app/entities/user/user";
import { GetUserByEmail } from "./get-user-by-email";

describe('use-cases-get-user-by-id', () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    const getUser = new GetUserByEmail(userRepository);
    let createdUser: User;

    beforeAll(async () => {
        const { user } = await createUser.execute({
            name: 'Marcos',
            email: 'teste@teste.com',
            password: '12345678'
        });
        createdUser = user;
    })

    it('should be able to get user by user email.', async () => {
        const { user } = await getUser.execute({
            email: createdUser.email.value
        });
        expect(user).toEqual(createdUser);
    });
    it('should not be able to get user with nonexistent email.', async () => {

        const nonexistentEmail = async () => {
            await getUser.execute({
                email: 'fake-email@email.com',
            });
        };
    
        await expect(nonexistentEmail()).rejects.toThrow('User not found.');
    });
});

