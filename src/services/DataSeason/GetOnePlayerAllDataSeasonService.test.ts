import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { DataSeason } from '../../entities/DataSeason';
import { GetOnePlayerAllDataSeasonService } from './GetOnePlayerAllDataSeasonService';

jest.mock('../../repositories/DataSeasonRepository')
const dataSeasonRepositoryMock = require('../../repositories/DataSeasonRepository')
const getOneAllDataSeasonService = new GetOnePlayerAllDataSeasonService({
    dataSeasonRepository: dataSeasonRepositoryMock,
    playerId: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4'
})

describe('GetOnePlayerAllDataSeasonService', () => {
    beforeAll(async () => {
        await createConnection();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    const dataSeasonMock = {
        data_season_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
        player_id: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4',
        season_id: '6695a631-d1a6-4f45-8f81-afb33e496468',
        games: 3,
        goals: 2,
        assists: 1
    }

    const otherDataSeasonMock = {
        data_season_id: '1b4416d6-a095-4941-b543-a5a2b9be3b7f',
        player_id: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4',
        season_id: 'db563bce-4f8e-44bb-8696-634d41cae495',
        games: 3,
        goals: 2,
        assists: 1
    }

    const acumulatedDataSeasonMock = {
        players_player_id: '5fcd39e2-1187-4a15-bc61-2bb065adc7d5',
        players_name: 'Player',
        games: 6,
        goals: 4,
        assists: 2
    }

    it('Find a existing data for player', async () => {
        dataSeasonRepositoryMock.findByPlayer = jest.fn()
            .mockImplementation(() => Promise.resolve([dataSeasonMock, otherDataSeasonMock]))

        dataSeasonRepositoryMock.findAllDataByPlayer = jest.fn()
            .mockImplementation(() => Promise.resolve(acumulatedDataSeasonMock))

        const dataSeasonReturned: DataSeason = new DataSeason(
            dataSeasonMock.player_id, 
            dataSeasonMock.season_id,
            dataSeasonMock.games,
            dataSeasonMock.goals,
            dataSeasonMock.assists
        )
        dataSeasonReturned.data_season_id = dataSeasonMock.data_season_id

        const otherDataSeasonReturned: DataSeason = new DataSeason(
            otherDataSeasonMock.player_id, 
            otherDataSeasonMock.season_id,
            otherDataSeasonMock.games,
            otherDataSeasonMock.goals,
            otherDataSeasonMock.assists
        )
        otherDataSeasonReturned.data_season_id = otherDataSeasonMock.data_season_id

        const returnedData = [ dataSeasonMock, otherDataSeasonMock ]

        const data = await getOneAllDataSeasonService.execute()

        expect(dataSeasonRepositoryMock.findByPlayer).toHaveBeenCalled()
        expect(data).toMatchObject({
            detailed: returnedData,
            total: acumulatedDataSeasonMock
        })
    })  
    
    it('should return a error when have internal error', async () => {
        dataSeasonRepositoryMock.findByPlayer = jest.fn().mockRejectedValue({
            findOneReturn: undefined
        })

        try {
            await getOneAllDataSeasonService.execute()
        } catch (error) {
            expect(error).toMatchObject({message: 'Error'})
        }
    })
})
