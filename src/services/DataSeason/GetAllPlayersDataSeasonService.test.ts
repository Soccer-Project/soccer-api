import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { GetAllPlayersDataSeasonService } from './GetAllPlayersDataSeasonService';

jest.mock('../../repositories/DataSeasonRepository')
const dataSeasonRepositoryMock = require('../../repositories/DataSeasonRepository')
const getAllPlayersDataSeasonService = new GetAllPlayersDataSeasonService(dataSeasonRepositoryMock);

describe('GetAllPlayersDataSeasonService', () => {

    beforeAll(async () => {
        await createConnection();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('return all data of all players', async () => {
        dataSeasonRepositoryMock.getAllPlayer = jest.fn()

        await getAllPlayersDataSeasonService.execute()

        expect(dataSeasonRepositoryMock.getAllPlayer).toHaveBeenCalled()
    })
})