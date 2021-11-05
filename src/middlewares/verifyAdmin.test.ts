import { NextFunction } from 'express';
import { makeMockRequest } from '../__mocks__/mockRequest';
import { makeMockResponse } from '../__mocks__/mockResponse';
import { verifyAdmin } from './verifyAdmin';

describe('verifyAdmin', () => {

    const response = makeMockResponse()
    const nextFunction: NextFunction = jest.fn();
    it('should call NextFunction if user is admin', async () => {

        const request = makeMockRequest({
            admin: true,
        })

        verifyAdmin(request, response, nextFunction)

        expect(nextFunction).toHaveBeenCalled()
    })

    it('should return response 401 if user is not admin', async () => {
        const request = makeMockRequest({})
        
        verifyAdmin(request, response, nextFunction)

        expect(response.state.status).toBe(401)
    })
})
