import { makeMockRequest } from '../../__mocks__/mockRequest';
import { makeMockResponse } from '../../__mocks__/mockResponse';
import { GetAllPlayerController } from './GetAllPlayerController';

let mockExecute = jest.fn();

jest.mock('../../services/Player/GetAllPlayerService', () => {
    return {
        GetAllPlayerService: jest.fn().mockImplementation(() => {
            return {
                execute: mockExecute
            }
        })
    }}
)

describe('GetAllPlayerController', () => {
    it('Should return status 200 and a empty array when does not have players', async () => {
        mockExecute = jest.fn().mockResolvedValue([])

        const getAllPlayerController = new GetAllPlayerController();
        
        const request = makeMockRequest({})
        const response = makeMockResponse()
        
        await getAllPlayerController.handle(request, response)

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(200)
        expect(response.state.json).toMatchObject([])
    })

    it('Should return status 200 and all players in database', async () => {
        mockExecute  = jest.fn().mockResolvedValueOnce([
            {
                player_id: 'a38e3f47-a1ee-4a17-b32b-2d732debd6b8',
                name: 'Messi'
            },
            {
                player_id: '59e11799-1710-4b19-a1d2-8e82a7c83d23',
                name: 'Neymar'
            }
        ])

        const getAllPlayerController = new GetAllPlayerController();
        
        const request = makeMockRequest({})
        const response = makeMockResponse()
        
        await getAllPlayerController.handle(request, response)

        expect(response.state.status).toBe(200)
        expect(response.state.json).toMatchObject([
            {
                player_id: 'a38e3f47-a1ee-4a17-b32b-2d732debd6b8',
                name: 'Messi'
            },
            {
                player_id: '59e11799-1710-4b19-a1d2-8e82a7c83d23',
                name: 'Neymar'
            }
        ])
    })

    it('Should return status 500 when have error server', async () => {
        mockExecute = jest.fn().mockImplementation(() => {
            throw new Error;
        });

        const getAllPlayerController = new GetAllPlayerController();
        
        const request = makeMockRequest({})
        const response = makeMockResponse()
        
        await getAllPlayerController.handle(request, response)

        expect(mockExecute).toBeCalled()
        expect(response.state.status).toBe(500)
        expect(response.state.json).toMatchObject({"message": "Error"})
    })
})
