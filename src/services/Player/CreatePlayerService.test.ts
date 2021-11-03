import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { CreatePlayerService } from './CreatePlayerService';

jest.mock('../../repositories/PlayerRepository')

const playerRepositoryMock = require('../../repositories/PlayerRepository')
const createPlayerService = new CreatePlayerService({
    playerRepository: playerRepositoryMock,
    name: 'Player'
})

describe('CreatePlayerService', () => {
    
    beforeEach(async () => {
        await createConnection()
        playerRepositoryMock.save = jest.fn()
    })

    afterEach(async () => {
        const connection = getConnection()
        await connection.close()
    })
    it('Create a new player', async () => {
        await createPlayerService.execute()

        expect(playerRepositoryMock.save).toHaveBeenCalled()
    })
})
