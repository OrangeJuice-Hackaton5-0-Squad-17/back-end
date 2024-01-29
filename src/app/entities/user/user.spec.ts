import { User } from "./user"

describe('User', () => {
    it('should be able to create an user', () => {
        const user = new User({
            name: 'Marcos',
            email: 'teste@teste.com',
            password: '12345678'
        })
        expect(user).toBeTruthy();
    })
})