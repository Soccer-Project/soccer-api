import { DataSeason } from '../entities/DataSeason';
import { DataSeasonRepository } from './DataSeasonRepository';
import getManagerMock from '../__mocks__/getEntityManagerMock';

describe('DataSeasonRepository', () => {
    it('should call save method and return a data saved', async () => {
        const mockDataSeason: DataSeason = {
            data_season_id: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4',
            player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
            season_id: '6695a631-d1a6-4f45-8f81-afb33e496468',
            games: 3,
            goals: 2,
            assists: 1,
            playerId: {
                player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
                name: 'Some player'
            },
            seasonId: {
                season_id: '6695a631-d1a6-4f45-8f81-afb33e496468',
                name: '2020'
            }
        }
        
        const managerMock = await getManagerMock({
            saveReturn: mockDataSeason
        })
        const dataSeasonRepository = new DataSeasonRepository(managerMock)

        const data = await dataSeasonRepository.save(new DataSeason())

        expect(managerMock.save).toHaveBeenCalled()
        expect(data).toMatchObject(mockDataSeason)
    })

    it('should return a empty array when no data found', async () => {
        const managerMock = await getManagerMock({
            findReturn: []
        })

        const dataSeasonRepository = new DataSeasonRepository(managerMock)

        const data = await dataSeasonRepository.findByPlayer('5fcd39e2-1187-4a15-bc61-2bb065adc7d5')

        expect(managerMock.find).toHaveBeenCalled()
        expect(data).toMatchObject([])
    })

    it('should return a player is data when exists', async () => {
        
        const dataSeasonMock = {
            data_season_id: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4',
            player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
            season_id: '6695a631-d1a6-4f45-8f81-afb33e496468',
            games: 3,
            goals: 2,
            assists: 1,
            playerId: {
                player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
                name: 'Some player'
            },
            seasonId: {
                season_id: '6695a631-d1a6-4f45-8f81-afb33e496468',
                name: '2020'
            }
        }
        
        const dataSeasonReturned = new DataSeason(
            dataSeasonMock.player_id, 
            dataSeasonMock.season_id,
            dataSeasonMock.games,
            dataSeasonMock.goals,
            dataSeasonMock.assists
        )
        dataSeasonReturned.data_season_id = dataSeasonMock.data_season_id
        dataSeasonReturned.playerId = dataSeasonMock.playerId
        dataSeasonReturned.seasonId = dataSeasonMock.seasonId

        const managerMock = await getManagerMock({
            findReturn: [dataSeasonReturned]
        })

        const dataSeasonRepository = new DataSeasonRepository(managerMock)

        const data = await dataSeasonRepository.findByPlayer(dataSeasonMock.player_id)

        const dataSeasonExpected = new DataSeason(
            dataSeasonMock.player_id, 
            dataSeasonMock.season_id,
            dataSeasonMock.games,
            dataSeasonMock.goals,
            dataSeasonMock.assists
        )
        dataSeasonExpected.data_season_id = dataSeasonMock.data_season_id
        dataSeasonExpected.playerId = dataSeasonMock.playerId
        dataSeasonExpected.seasonId = dataSeasonMock.seasonId

        expect(managerMock.find).toHaveBeenCalled()
        expect(data).toMatchObject([dataSeasonExpected])
    })

    it('should return a array when exists multiples season for player', async () => {
        
        const dataSeasonMock = {
            data_season_id: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4',
            player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
            season_id: '6695a631-d1a6-4f45-8f81-afb33e496468',
            games: 3,
            goals: 2,
            assists: 1
        }

        const anotherDataSeasonMock = {
            data_season_id: '1b4416d6-a095-4941-b543-a5a2b9be3b7f',
            player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
            season_id: 'db563bce-4f8e-44bb-8696-634d41cae495',
            games: 3,
            goals: 2,
            assists: 1
        }
        
        const dataSeasonReturned = new DataSeason(
            dataSeasonMock.player_id, 
            dataSeasonMock.season_id,
            dataSeasonMock.games,
            dataSeasonMock.goals,
            dataSeasonMock.assists
        )
        dataSeasonReturned.data_season_id = dataSeasonMock.data_season_id

        const anotherDataSeasonReturned = new DataSeason(
            anotherDataSeasonMock.player_id, 
            anotherDataSeasonMock.season_id,
            anotherDataSeasonMock.games,
            anotherDataSeasonMock.goals,
            anotherDataSeasonMock.assists
        )
        anotherDataSeasonReturned.data_season_id = anotherDataSeasonMock.data_season_id

        const managerMock = await getManagerMock({
            findReturn: [dataSeasonReturned, anotherDataSeasonMock]
        })

        const dataSeasonRepository = new DataSeasonRepository(managerMock)

        const data = await dataSeasonRepository.findByPlayer(dataSeasonMock.player_id)

        const dataSeasonExpected = new DataSeason(
            dataSeasonMock.player_id, 
            dataSeasonMock.season_id,
            dataSeasonMock.games,
            dataSeasonMock.goals,
            dataSeasonMock.assists
        )
        dataSeasonExpected.data_season_id = dataSeasonMock.data_season_id

        const anotherDataSeasonExpected = new DataSeason(
            anotherDataSeasonMock.player_id, 
            anotherDataSeasonMock.season_id,
            anotherDataSeasonMock.games,
            anotherDataSeasonMock.goals,
            anotherDataSeasonMock.assists
        )
        anotherDataSeasonExpected.data_season_id = anotherDataSeasonMock.data_season_id

        expect(managerMock.find).toHaveBeenCalled()
        expect(data).toMatchObject([dataSeasonExpected, anotherDataSeasonExpected])
    })
})
