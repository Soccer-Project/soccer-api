import { Request } from 'express';
import { makeMockResponse } from '../../__mocks__/mockResponse';
import { CreateSeasonController } from './CreateSeasonController';

let mockExecute = jest.fn();

jest.mock('../../services/Season/CreateSeasonService', () => {
    return {
        CreateSeasonService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }}
)

describe('CreateSeasonController', () => {

    const newSeason = {
        season_id: '2020',
        name: 'New player'
    }

    const createSeasonController = new CreateSeasonController();

    const request = {
        body: {
            name: newSeason.name,
        }
    } as Request;

    const response = makeMockResponse();

    it('should return a id for a new season', async () => {
        mockExecute = jest.fn().mockResolvedValue(newSeason);

        await createSeasonController.handle(request, response);

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(200)
        expect(response.state.json).toMatchObject(newSeason)
    })

    it('should return status 500 when haver server error', async () => {
        mockExecute = jest.fn().mockImplementation(() => {
            throw new Error('Error')
        })

        try {
            await createSeasonController.handle(request, response)
        } catch (error) {
            expect(mockExecute).toBeCalled()
            expect(response.state.status).toBe(500)
        }
    })
})