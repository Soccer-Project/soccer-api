import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { DataSeason } from '../../entities/DataSeason';
import { Player } from '../../entities/Player';
import { Season } from '../../entities/Season';
import { CreatePlayerService } from '../Player/CreatePlayerService';
import { CreateSeasonService } from '../Season/CreateSeasonService';
import { CreateDataSeasonService } from './CreateDataSeasonService';
import { GetOnePlayerAllDataSeasonService } from './GetOnePlayerAllDataSeasonService';

describe('GetOnePlayerAllDataSeasonService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should return a data about players', async () => {

        const expectedResonse = [
            {
                games: 3,
                goals: 1,
                assists: 2,
                playerId: {
                name: 'Some player'
                },
                seasonId: {
                name: 1601
                }
            },
            {
                games: 3,
                goals: 1,
                assists: 2,
                playerId: {
                    name: 'Some player'
                },
                seasonId: {
                    name: 1600
                }
            }
        ]

        const createDataSeasonService = new CreateDataSeasonService();
        const createPlayerService = new CreatePlayerService();
        const createSeasonService = new CreateSeasonService();
        const getOnePlayerAllDataSeasonService = new GetOnePlayerAllDataSeasonService();

        const getPlayerId = await createPlayerService.execute({ name: 'Some player' })
        const getSeasonId = await createSeasonService.execute({ name: '1601' })
        const getSeasonId2 = await createSeasonService.execute({ name: '1600' })

        const playerId = getPlayerId[0].player_id
        const seasonId = getSeasonId[0].season_id
        const seasonId2 = getSeasonId2[0].season_id

        await createDataSeasonService.execute({ player_id: playerId, season_id: seasonId, games: 3, goals: 1, assists: 2 });
        await createDataSeasonService.execute({ player_id: playerId, season_id: seasonId2, games: 3, goals: 1, assists: 2 });

        const response = await getOnePlayerAllDataSeasonService.execute({ playerId: playerId })

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(DataSeason)
            .execute()

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Season)
            .execute()

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Player)
            .execute()


        expect(response).toMatchObject(expectedResonse)
    })
})