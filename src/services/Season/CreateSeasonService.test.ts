import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { CreateSeasonService } from './CreateSeasonService';

jest.mock('../../repositories/SeasonRepository')

const seasonRepositoryMock = require('../../repositories/SeasonRepository')
const createSeasonService = new CreateSeasonService({
    seasonRepository: seasonRepositoryMock,
    name: '2020'
})

describe('CreateSeasonService', () => {
    beforeAll(async () => {
        await createConnection();
        seasonRepositoryMock.save = jest.fn()
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('Create a new season', async () => {
        await createSeasonService.execute()

        expect(seasonRepositoryMock.save).toHaveBeenCalled()
    })
})
