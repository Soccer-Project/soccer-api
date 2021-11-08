import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Season } from '../../entities/Season';
import { CreateSeasonService } from './CreateSeasonService';

jest.mock('../../repositories/SeasonRepository')

const seasonRepositoryMock = require('../../repositories/SeasonRepository')
const createSeasonService = new CreateSeasonService({
    seasonRepository: seasonRepositoryMock,
    name: '2020'
})

describe('CreateSeasonService', () => {

    const seasonMock: Season = new Season()
    seasonMock.season_id = 'de29478c-c051-4ee9-b48d-e087ec3cbf80'
    seasonMock.name = '2020'

    beforeAll(async () => {
        await createConnection();
        seasonRepositoryMock.save = jest.fn().mockImplementation(() => Promise.resolve(seasonMock))
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('Create a new season', async () => {
        const season = await createSeasonService.execute()

        expect(seasonRepositoryMock.save).toHaveBeenCalled()
        expect(season).toMatchObject(seasonMock)
    })
})
