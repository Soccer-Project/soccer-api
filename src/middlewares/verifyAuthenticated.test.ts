import { NextFunction, Request } from 'express';
import * as jsonwebtoken from 'jsonwebtoken'
import { makeMockResponse } from '../__mocks__/mockResponse';
import { verifyAuthenticated } from './verifyAuthenticated';

jest.mock('jsonwebtoken')

describe('verifyAuthenticated', () => {

    const response = makeMockResponse()
    const nextFunction: NextFunction = jest.fn();

    it('should call NextFunction if user is authenticated', () => {
        const request = ({
            headers: {
                authorization: `Bearer s0m3_t0k31/1`
            }
        }) as Request

        jest.spyOn(jsonwebtoken, 'verify').mockImplementation(() => ({
            sub: '123456'
        }));

        verifyAuthenticated(request, response, nextFunction)

        expect(nextFunction).toHaveBeenCalled()
    })

    it('should return status 401 when dont exists authorization', () => {
        const request = ({
            headers: {}
        }) as Request

        verifyAuthenticated(request, response, nextFunction)

        expect(nextFunction).not.toHaveBeenCalled()
        expect(response.state.status).toBe(401)
    })
})
