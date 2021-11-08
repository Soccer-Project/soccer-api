import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Player } from '../../entities/Player';
import { CreatePlayerService } from './CreatePlayerService';

jest.mock('../../repositories/PlayerRepository')

const playerRepositoryMock = require('../../repositories/PlayerRepository')
const createPlayerService = new CreatePlayerService({
    playerRepository: playerRepositoryMock,
    name: 'Some player'
})

describe('CreatePlayerService', () => {

    const playerMock: Player = new Player()
    playerMock.player_id = 'de29478c-c051-4ee9-b48d-e087ec3cbf80'
    playerMock.name = 'Some player'
    
    beforeEach(async () => {
        await createConnection()
        playerRepositoryMock.save = jest.fn().mockImplementation(() => Promise.resolve(playerMock))
    })

    afterEach(async () => {
        const connection = getConnection()
        await connection.close()
    })
    it('Create and return a new player created', async () => {
        const player = await createPlayerService.execute()

        expect(playerRepositoryMock.save).toHaveBeenCalled()
        expect(player).toMatchObject(playerMock)
    })
})
