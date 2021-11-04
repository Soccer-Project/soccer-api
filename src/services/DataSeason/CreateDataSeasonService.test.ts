import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { CreateDataSeasonService } from './CreateDataSeasonService';

jest.mock('../../repositories/DataSeasonRepository')

const dataSeasonRepositoryMock = require('../../repositories/DataSeasonRepository')
const createDataSeasonService = new CreateDataSeasonService({
    dataSeasonRepository: dataSeasonRepositoryMock,
    player_id: '1892c556-7c47-489a-818a-8cbb10b6b346',
    season_id: 'a38e3f47-a1ee-4a17-b32b-2d732debd6b8',
    games: 3,
    goals: 2,
    assists: 1
})

describe('CreateDataSeasonService', () => {
    beforeAll(async () => {
        await createConnection();
        dataSeasonRepositoryMock.save = jest.fn()
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('Create a new data for a season of player', async () => {
        await createDataSeasonService.execute()
        expect(dataSeasonRepositoryMock.save).toHaveBeenCalled()
    })
})
