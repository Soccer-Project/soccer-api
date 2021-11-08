import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Player } from '../../entities/Player';
import { GetOnePlayerService } from './GetOnePlayerService';

jest.mock('../../repositories/PlayerRepository')

const playerRepositoryMock = require('../../repositories/PlayerRepository')
const getOnePlayerService = new GetOnePlayerService({
    playerRepository: playerRepositoryMock,
    playerId: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4'
})

describe('GetOnePlayerService', () => {

    const playerMock: Player = new Player()
    playerMock.player_id = 'de29478c-c051-4ee9-b48d-e087ec3cbf80'
    playerMock.name = 'Some player'
    
    beforeEach(async () => {
        await createConnection()
    })

    afterEach(async () => {
        const connection = getConnection()
        await connection.close()
    })
    it('Find a existing player', async () => {
        playerRepositoryMock.findById = jest.fn()
            .mockImplementation(() => Promise.resolve([playerMock]))

        const player = await getOnePlayerService.execute()

        expect(playerRepositoryMock.findById).toHaveBeenCalled()
        expect(player).toMatchObject([playerMock])
    })

    it('Should return a error message when user does not exist', async () => {
        playerRepositoryMock.findById = jest.fn().mockRejectedValue({
            findOneReturn: undefined
        })

        try {
            await getOnePlayerService.execute()
        } catch (error) {
            expect(error).toMatchObject({message: 'Player not found!'})
        }
    })

})
