import { Request } from 'express';
import { makeMockResponse } from '../utils/mocks/mockResponse';
import { makeMockRequest } from '../utils/mocks/mockRequest';
import { MessageController } from './MessageController';

describe('MessageController', () => {
    it('Should show a wellcome message', async () => {
        const messageController = new MessageController();

        const request = makeMockRequest({})

        const response = makeMockResponse();

        await messageController.handle(request, response);

        expect(response.state.status).toBe(200);
        expect(response.state.json).toEqual({
            message: 'Wellcome to soccerAPI'
        })
    })
})
