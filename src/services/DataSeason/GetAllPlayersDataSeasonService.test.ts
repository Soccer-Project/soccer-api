import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { GetAllPlayersDataSeasonService } from './GetAllPlayersDataSeasonService';

// jest.mock('../../repositories/DataSeasonRepository')
// const dataSeasonRepositoryMock = require('../../repositories/DataSeasonRepository')
// const getAllPlayersDataSeasonService = new GetAllPlayersDataSeasonService();

describe('GetAllPlayersDataSeasonService', () => {

    beforeAll(async () => {
        await createConnection();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('return all data of all players', async () => {
        const expectedResponse = {
            players_name: 'Some Player',
            games: 4,
            goals: 4,
            assists: 4
        }

        const getAllPlayersDataSeasonService = new GetAllPlayersDataSeasonService();

        const result = await getAllPlayersDataSeasonService.execute()

        expect(result).toMatchObject([expectedResponse])
    })
})