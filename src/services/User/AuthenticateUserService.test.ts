import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { AuthenticateUserService } from './AuthenticateUserService'

// TODO: implements a mock for jwt
// let mockSign = jest.fn()

// jest.mock('jsonwebtoken', () => {
//     return {
//         jwt: jest.fn().mockImplementation(() => {
//             return {
//                 sign: mockSign
//             }
//         })
//     }
// })

jest.mock('../../repositories/UserRepository')

const userRepositoryMock = require('../../repositories/UserRepository')
const authenticateUserService = new AuthenticateUserService({
    userRepository: userRepositoryMock,
    name: 'Some user',
    password: '123456'
})

describe('AuthenticateUserService', () => {
    beforeEach(async () => {
        await createConnection()
    })

    afterEach(async () => {
        const connection = getConnection()
        await connection.close()
    })

    it('should return a user authenticated', async () => {
        userRepositoryMock.findByName = jest.fn().mockResolvedValueOnce([{
            user_id: 'a38e3f47-a1ee-4a17-b32b-2d732debd6b8',
            name: 'Some user',
            password: 'pa55w0rd',
            admin: true
        }])

        await authenticateUserService.execute()

        expect(userRepositoryMock.findByName).toHaveBeenCalled()

    })

    it('should return a error when user does not authenticated', async ()=>{
        userRepositoryMock.findByName = jest.fn().mockResolvedValueOnce([])

        await expect(authenticateUserService.execute()).rejects.toThrowError()
    })
})