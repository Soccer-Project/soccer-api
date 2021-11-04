import { makeMockRequest } from '../../__mocks__/mockRequest';
import { makeMockResponse } from '../../__mocks__/mockResponse';
import { GetAllPlayersDataSeasonController } from './GetAllPlayersDataSeasonController'

let mockExecute = jest.fn();

jest.mock('../../services/DataSeason/GetAllPlayersDataSeasonService', () => {
    return {
        GetAllPlayersDataSeasonService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }
})

describe('GetAllPlayersDataSeasonController', () => {
    it('should return status 200 when find players', async () => {
        const getAllPlayersDataSeasonController = new GetAllPlayersDataSeasonController();

        const request = makeMockRequest({})
        const response = makeMockResponse()

        await getAllPlayersDataSeasonController.handle(request, response)

        expect(response.state.status).toBe(200)
    })
})