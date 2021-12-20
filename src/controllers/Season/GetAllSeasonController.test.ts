import { makeMockRequest } from '../../__mocks__/mockRequest';
import { makeMockResponse } from '../../__mocks__/mockResponse';
import { GetAllSeasonController } from './GetAllSeasonController';

let mockExecute = jest.fn();

jest.mock('../../services/Season/GetAllSeasonService', () => {
    return {
        GetAllSeasonService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }}
)

describe('GetAllSeasonController', () => {
    it('Should return status 200 and a empty array when does not have seasons', async () => {
        mockExecute = jest.fn().mockResolvedValue([])

        const getAllSeasonController = new GetAllSeasonController();
        
        const request = makeMockRequest({})
        const response = makeMockResponse()
        
        await getAllSeasonController.handle(request, response)

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(200)
        expect(response.state.json).toMatchObject([])
    })

    it('Should return status 200 and all seasons in database', async () => {
        mockExecute  = jest.fn().mockResolvedValueOnce([
            {
                season_id: '2c610ceb-e5b4-4930-ac42-66772a0fa20a',
                name: '2020'
            },
            {
                season_id: 'f7ac0601-e7fb-42b9-8d07-bb6348780065',
                name: '2019'
            }
        ])

        const getAllSeasonController = new GetAllSeasonController();
        
        const request = makeMockRequest({})
        const response = makeMockResponse()
        
        await getAllSeasonController.handle(request, response)

        expect(response.state.status).toBe(200)
        expect(response.state.json).toMatchObject([
            {
                season_id: '2c610ceb-e5b4-4930-ac42-66772a0fa20a',
                name: '2020'
            },
            {
                season_id: 'f7ac0601-e7fb-42b9-8d07-bb6348780065',
                name: '2019'
            }
        ])
    })

    it('Should return status 500 when have error server', async () => {
        mockExecute = jest.fn().mockImplementation(() => {
            throw new Error;
        });

        const getAllSeasonController = new GetAllSeasonController();
        
        const request = makeMockRequest({})
        const response = makeMockResponse()
        
        await getAllSeasonController.handle(request, response)

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(500)
        expect(response.state.json).toMatchObject({"message": "Error"})
    })
})
