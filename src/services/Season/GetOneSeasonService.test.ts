import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Season } from '../../entities/Season';
import { GetOneSeasonService } from './GetOneSeasonService';

jest.mock('../../repositories/SeasonRepository')

const seasonRepositoryMock = require('../../repositories/SeasonRepository')
const getOneSeasonService = new GetOneSeasonService({
    seasonRepository: seasonRepositoryMock,
    seasonId: 'a38e3f47-a1ee-4a17-b32b-2d732debd6b8'
});

describe('GetOneSeasonService', () => {
    const seasonMock: Season = new Season()
    seasonMock.season_id = 'a38e3f47-a1ee-4a17-b32b-2d732debd6b8'
    seasonMock.name = '2020'

    beforeAll(async () => {
        await createConnection();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('Find and return a existing season', async () => {
        seasonRepositoryMock.findById = jest.fn()
            .mockImplementation(() => Promise.resolve([seasonMock]))

        const season = await getOneSeasonService.execute()

        expect(seasonRepositoryMock.findById).toHaveBeenCalled()
        expect(season).toMatchObject([seasonMock])
    })

    it('should return a error message when season does not exist', async () => {
        seasonRepositoryMock.findById = jest.fn().mockRejectedValue({
            findOneReturn: undefined
        })

        try {
            await getOneSeasonService.execute()
        } catch (error) {
            expect(error).toMatchObject({message: 'Season not found!'})
        }
    })
})
