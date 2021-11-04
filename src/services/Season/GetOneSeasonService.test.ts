import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { GetOneSeasonService } from './GetOneSeasonService';

jest.mock('../../repositories/SeasonRepository')

const seasonRepositoryMock = require('../../repositories/SeasonRepository')
const getOneSeasonService = new GetOneSeasonService({
    seasonRepository: seasonRepositoryMock,
    seasonId: 'a38e3f47-a1ee-4a17-b32b-2d732debd6b8'
});

describe('GetOneSeasonService', () => {
    beforeAll(async () => {
        await createConnection();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('Find a existing season', async () => {
        seasonRepositoryMock.findById = jest.fn()

        await getOneSeasonService.execute()

        expect(seasonRepositoryMock.findById).toHaveBeenCalled()
    })
})