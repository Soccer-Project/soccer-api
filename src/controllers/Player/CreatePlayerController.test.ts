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

    const createPlayerController = new CreatePlayerController();

    const request = {
        body: {
            name: newPlayer.name
        }
    } as Request;

    const response = makeMockResponse();

    it('should return a player when created', async () => {
        mockExecute = jest.fn().mockResolvedValue(newPlayer)

        await createPlayerController.handle(request, response);

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(200)
        expect(response.state.json).toMatchObject(newPlayer)
    })

    it('should return status 500 when have server error', async () => {
        mockExecute = jest.fn().mockImplementation(() => {
            throw new Error('Error')
        })

        try {
            await createPlayerController.handle(request, response)   
        } catch (error) {
            expect(mockExecute).toBeCalled()
            expect(response.state.status).toBe(500)
        }
    })

    it('should not create a player with empty name', async () => {
        const request = {
            body: {
                name: ''
            }
        } as Request;

        await createPlayerController.handle(request, response)

        expect(response.state.status).toBe(505)
    })

})
