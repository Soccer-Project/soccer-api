import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Season } from '../../entities/Season';
import { GetAllSeasonService } from './GetAllSeasonService';

jest.mock('../../repositories/SeasonRepository')

const seasonRepositoryMock = require('../../repositories/SeasonRepository')
const getAllSeasonService = new GetAllSeasonService(seasonRepositoryMock);

describe('GetAllSeasonService', () => {
    const mockAllSeason: Season[] = []

    mockAllSeason[0] = new Season();
    mockAllSeason[0].season_id = "2c610ceb-e5b4-4930-ac42-66772a0fa20a"
    mockAllSeason[0].name = "2020"
    mockAllSeason[1] = new Season();
    mockAllSeason[1].season_id = "ef564c02-e835-476a-9ccb-d3b16acf4a78"
    mockAllSeason[1].name = "2021"
    mockAllSeason[2] = new Season();
    mockAllSeason[2].season_id = "f7ac0601-e7fb-42b9-8d07-bb6348780065"
    mockAllSeason[2].name = "2019"

    beforeAll(async () => {
        await createConnection();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('Should return all seasons existing', async () => {
        seasonRepositoryMock.getAll = jest.fn()
            .mockImplementation(() => Promise.resolve(mockAllSeason))

        const seasons = await getAllSeasonService.execute()

        expect(seasonRepositoryMock.getAll).toHaveBeenCalled()
        expect(seasons).toMatchObject(mockAllSeason)
    })

    it('should return a error message when seasons does not exist', async () => {
        seasonRepositoryMock.getAll = jest.fn().mockRejectedValue({
            find: undefined
        })

        try {
            await getAllSeasonService.execute()
        } catch (error) {
            expect(error).toMatchObject({message: 'Seasons not found!'})
        }
    })
})
