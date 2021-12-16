
import { makeMockResponse } from '../../__mocks__/mockResponse';
import { makeMockRequest } from '../../__mocks__/mockRequest';
import { GetOnePlayerAllDataSeasonController } from './GetOnePlayerAllDataSeasonController';

let mockExecute = jest.fn();

jest.mock('../../services/DataSeason/GetOnePlayerAllDataSeasonService', () => {
    return {
        GetOnePlayerAllDataSeasonService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }
})


describe('GetOnePlayerAllDataSeasonController', () => {
    it('should return status 200 and data when existing a player', async () => {
        const dataSeasonMock = {
            data_season_id: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4',
            player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
            season_id: '6695a631-d1a6-4f45-8f81-afb33e496468',
            games: 3,
            goals: 2,
            assists: 1
        }
        mockExecute = jest.fn().mockResolvedValue({
            detailed: dataSeasonMock,
            total: {
                players_player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
                players_name: 'Player name',
                games: 3,
                goals: 2,
                assists: 1
            }
        })

        const getOnePlayerAllDataSeasonController = new GetOnePlayerAllDataSeasonController();

        const request = makeMockRequest({
            playerId: dataSeasonMock.player_id
        })

        const response = makeMockResponse();

        await getOnePlayerAllDataSeasonController.handle(request, response)

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(200)
        expect(response.state.json).toMatchObject({
            detailed: dataSeasonMock,
            total: {
                players_player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
                players_name: 'Player name',
                games: 3,
                goals: 2,
                assists: 1
            }
        })
    })
})
