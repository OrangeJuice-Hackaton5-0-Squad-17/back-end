import { InMemoryUserRepository } from "./../../../../test/repositories/in-memory-user-repository";
import { CreateUser } from "./create-user";

describe('use-cases-create-user', () => {
    it('should be able to create an user, and have 1 user at dataBase equal to created user.', async () => {
        const userRepository = new InMemoryUserRepository();
        const createUser = new CreateUser(userRepository);
        const { user } = await createUser.execute({
            name: 'Marcos',
            email: 'teste@teste.com',
            password: '12345678'
        });
        expect(userRepository.users).toHaveLength(1);
        expect(userRepository.users[0]).toEqual(user);
    });
});

