import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Player } from '../../entities/Player';
import { GetAllPlayerService } from './GetAllPlayerService';

jest.mock('../../repositories/PlayerRepository')

const playerRepositoryMock = require('../../repositories/PlayerRepository')
const getAllPlayerService = new GetAllPlayerService(playerRepositoryMock)

describe('GetAllPlayerService', () => {

    const playerMock: Player = new Player()
    playerMock.player_id = 'de29478c-c051-4ee9-b48d-e087ec3cbf80'
    playerMock.name = 'Some player'

    const otherPlayerMock: Player = new Player()
    otherPlayerMock.player_id = 'fg1234-c051-4ee9-b48d-e087ec3cbf78'
    otherPlayerMock.name = 'Other player'

    beforeEach(async () => {
        await createConnection()
        playerRepositoryMock.getAll = jest.fn()
            .mockImplementation(() => Promise.resolve([playerMock, otherPlayerMock]))
    })

    afterEach(async () => {
        const connection = getConnection()
        await connection.close()
    })
    it('get all players', async () => {
        const players = await getAllPlayerService.execute()

        expect(playerRepositoryMock.getAll).toHaveBeenCalled()
        expect(players).toMatchObject([playerMock, otherPlayerMock])
    })
})
