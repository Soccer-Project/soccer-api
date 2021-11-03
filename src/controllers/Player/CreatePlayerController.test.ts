import { Request } from 'express';
import { makeMockResponse } from '../../__mocks__/mockResponse';
import { CreatePlayerController } from './CreatePlayerController'

let mockExecute = jest.fn();

jest.mock('../../services/Player/CreatePlayerService', () => {
    return {
        CreatePlayerService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }}
)

describe('CreatePlayerController', () => {

    const newPlayer = {
        player_id: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4',
        name: 'New player'
    }

    it('should return a id for a new player', async () => {
        mockExecute = jest.fn().mockResolvedValue(newPlayer)

        const createPlayerController = new CreatePlayerController();

        const request = {
            body: {
                name: newPlayer.name
            }
        } as Request;

        const response = makeMockResponse();

        await createPlayerController.handle(request, response);

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(200)
        expect(response.state.json).toMatchObject(newPlayer)
    })
})
