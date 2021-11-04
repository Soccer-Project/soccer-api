import { Request, response } from 'express';
import { makeMockResponse } from '../../__mocks__/mockResponse';
import { CreateDataSeasonController } from './CreateDataSeasonController';

let mockExecute = jest.fn();

jest.mock('../../services/DataSeason/CreateDataSeasonService', () => {
    return {
        CreateDataSeasonService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }
})

describe('CreateDataSeasonController', () => {
    
    const newData = {
        player_id: '1892c556-7c47-489a-818a-8cbb10b6b346',
        season_id: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4',
        games: 3,
        goals: 2,
        assists:1
    }

    const createDataSeasonController = new CreateDataSeasonController();

    const request = {
        body: {
            player_id: newData.player_id, 
            season_id: newData.season_id, 
            games: newData.games,
            goals: newData.goals,
            assists: newData.assists,
        }
    } as Request;

    const response = makeMockResponse();

    it('should return status 200 when add data', async () => {
        mockExecute = jest.fn()

        await createDataSeasonController.handle(request, response)

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(200)
    })

    it('should return status 500 when have server error', async () => {
        mockExecute = jest.fn().mockImplementation(() => {
            throw new Error('Error')
        })

        try {
            await createDataSeasonController.handle(request, response)   
        } catch (error) {
            expect(mockExecute).toBeCalled()
            expect(response.state.status).toBe(500)
        }
    })
})