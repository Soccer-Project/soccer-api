import { SeasonRepository } from './SeasonRepository';
import getManagerMock from '../__mocks__/getEntityManagerMock'
import { Season } from '../entities/Season';

describe('SeasonRepository', () => {

    const seasonMock: Season = new Season()
    seasonMock.season_id = 'de29478c-c051-4ee9-b48d-e087ec3cbf80'
    seasonMock.name = '2020'

    const otherSeasonMock: Season = new Season()
    otherSeasonMock.season_id = 'fg1234-c051-4ee9-b48d-e087ec3cbf78'
    otherSeasonMock.name = '2021'
    it('should call getAll method and return all season', async () => {
        const managerMock = await getManagerMock({
            findReturn: [ seasonMock, otherSeasonMock ]
        });

        const seasonRepository = new SeasonRepository(managerMock);

        const result = await seasonRepository.getAll()

        expect(managerMock.find).toHaveBeenCalled()
        expect(result).toMatchObject([seasonMock, otherSeasonMock])
    })

    it('should call save method and return a season created', async () => {
        const managerMock = await getManagerMock({
            saveReturn: seasonMock
        });
        const seasonRepository = new SeasonRepository(managerMock);

        const season = await seasonRepository.save(seasonMock);

        expect(managerMock.save).toHaveBeenCalled()
        expect(season).toMatchObject(seasonMock);
    })

    it('should return a season when exist', async () => {
        const managerMock = await getManagerMock({
            findOneReturn: seasonMock
        })

        const seasonRepository = new SeasonRepository(managerMock)

        const season = await seasonRepository.findById(seasonMock.season_id)

        expect(managerMock.findOne).toHaveBeenCalled()
        expect(season).toMatchObject(seasonMock)
    })

    it('should trhow error when not find season by id', async () => {
        const managerMock = await getManagerMock({
            findOneReturn: undefined
        })

        const seasonRepository = new SeasonRepository(managerMock)

        try {
            await seasonRepository.findById('896fe1b6-5ae4-4da2-a94f-e64d640c09d4')
        } catch (error) {
            expect(managerMock.findOne).toHaveBeenCalled()
            expect(error).toMatchObject({message: 'Season not found!'})
        }
    })
})
