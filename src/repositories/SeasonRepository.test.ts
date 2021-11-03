import { SeasonRepository } from './SeasonRepository';
import getManagerMock from '../__mocks__/getEntityManagerMock'
import { Season } from '../entities/Season';

describe('SeasonRepository', () => {
    it('should call getAll method', async () => {
        const managerMock = await getManagerMock({});
        const seasonRepository = new SeasonRepository(managerMock);

        seasonRepository.getAll()

        expect(managerMock.find).toHaveBeenCalled()
    })

    it('should call save method', async () => {
        const managerMock = await getManagerMock({});
        const seasonRepository = new SeasonRepository(managerMock);

        seasonRepository.save(new Season())

        expect(managerMock.save).toHaveBeenCalled()
    })

    it('should return a season when exist', async () => {
        const mockSeason = {
            season_id: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4',
            name: '2020'
        }
        
        const seasonReturned = new Season();
        seasonReturned.season_id = mockSeason.season_id
        seasonReturned.name = mockSeason.name

        const managerMock = await getManagerMock({
            findOneReturn: seasonReturned
        })

        const seasonRepository = new SeasonRepository(managerMock)

        const season = await seasonRepository.findById(mockSeason.season_id)

        const seasonExpected = new Season()
        seasonExpected.season_id = mockSeason.season_id
        seasonExpected.name = mockSeason.name

        expect(managerMock.findOne).toHaveBeenCalled()
        expect(season).toMatchObject(seasonExpected)
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
            expect(error).toMatchObject({mesage: 'Season not found!'})
        }
    })
})
