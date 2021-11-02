import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { GetAllPlayerService } from './GetAllPlayerService';

jest.mock('../../repositories/PlayerRepository.ts')

const playerRepositoryMock = require('../../repositories/PlayerRepository.ts')
const getAllPlayerService = new GetAllPlayerService(playerRepositoryMock)

describe('GetAllPlayerService', () => {

    beforeEach(async () => {
        await createConnection()
        playerRepositoryMock.getAll = jest.fn()
    })

    afterEach(async () => {
        const connection = getConnection()
        await connection.close()
    })
    it('gel all players', async () => {
        await getAllPlayerService.execute()

        expect(playerRepositoryMock.getAll).toHaveBeenCalled()
    })
})