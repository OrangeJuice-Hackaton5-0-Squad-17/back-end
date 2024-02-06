import { User } from "@app/entities/user/user";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { CreateUser } from "./create-user";
import { UpdateUser } from "./update-user";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../app.module";
import * as request from 'supertest';

describe('use-cases-update-user', () => {
    let userRepository: InMemoryUserRepository;
    let user: User;
    let lastTestRun: boolean;
    const realTestUserAtDbID = 'a3ct9f81-gfa4-41a1-b392-1dhg1d9ea2fd'

    beforeAll(async () => {
        userRepository = new InMemoryUserRepository();
        const createUser = new CreateUser(userRepository);
        const { user: createdUser } = await createUser.execute({
            name: 'Marcos',
            email: 'teste@teste.com',
            password: '12345678'
        });
        user = createdUser;
    });

    it('should be able to update all editable fields from an user successfully.', async () => {
        const updateUser = new UpdateUser(userRepository);
        await updateUser.execute({
            id: user.id,
            name: 'Novo Nome',
            email: 'novo@teste.com',
            password: 'novasenha123'
        });
        const updatedUser = await userRepository.findById(user.id);

        expect(updatedUser.name).toBe('Novo Nome');
        expect(updatedUser.created_at).toEqual(user.created_at);
        expect(updatedUser.updated_at).toBeDefined();
        expect(updatedUser.updated_at instanceof Date).toBe(true);
        expect(updatedUser.created_at).not.toEqual(updatedUser.updated_at);
    });

    it('should be able to update only one field from an user successfully.', async () => {
        const updateUser = new UpdateUser(userRepository);
        await updateUser.execute({
            id: user.id,
            name: 'Novo Nome One',
        });
        const updatedUser = await userRepository.findById(user.id);

        expect(updatedUser.name).toBe('Novo Nome One');
        expect(updatedUser.created_at).toEqual(user.created_at);
        expect(updatedUser.updated_at).toBeDefined();
        expect(updatedUser.updated_at instanceof Date).toBe(true);
        expect(updatedUser.created_at).not.toEqual(updatedUser.updated_at);
    });

    it('should throw error if trying to update a not found user.', async () => {
        const updateUser = new UpdateUser(userRepository);
    
        const updateUserNotFound = async () => {
            await updateUser.execute({
                id: 'fake-id',
                name: 'Usuario fake'
            });
        };
    
        await expect(updateUserNotFound()).rejects.toThrow('User not found.');
    });

    it('should throw error if trying to update an user with invalid email.', async () => {
        const updateUser = new UpdateUser(userRepository);
    
        const updateUserNotFound = async () => {
            await updateUser.execute({
                id: user.id,
                email: 'emailInválido'
            });
        };
    
        await expect(updateUserNotFound()).rejects.toThrow('The email must be a valid email address.');
    });

    let app: INestApplication;
    let moduleFixture: TestingModule;
  
    afterEach(async () => {
        if (lastTestRun) {
            await app.close();
        }
    });
    it('should throw error if trying to update an user with no valid access_token.', async () => {
        lastTestRun = true;
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
          }).compile();
      
          app = moduleFixture.createNestApplication();
          await app.init();
      
          const response = await request(app.getHttpServer())
            .patch(`/user/${realTestUserAtDbID}`)
            .send({});
      
          expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
          expect(response.body.message).toContain('Unauthorized');
          
    });
});
