import { Request } from 'express';
import { makeMockResponse } from '../../__mocks__/mockResponse';
import { AuthenticateUserController } from './AuthenticateUserController';

let mockExecute = jest.fn();

jest.mock('../../services/User/AuthenticateUserService', () => {
    return {
        AuthenticateUserService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }
})

describe('AuthenticateUser', () => {
    it('should return status 200 and token when user is authenticated', async() => {
        mockExecute = jest.fn().mockResolvedValue('sometoken')

        const authenticateUserController = new AuthenticateUserController();

        const request = {
            body: {
                name: 'Some user',
                password: 'pa55w0rd'
            }
        } as Request
        
        const response = makeMockResponse();

        await authenticateUserController.handle(request, response)

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(200)
        expect(response.state.json).toMatchObject({token: 'sometoken'})
    })

    //TODO: test return when user is not authenticated
})