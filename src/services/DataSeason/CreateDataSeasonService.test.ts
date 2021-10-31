import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { DataSeason } from '../../entities/DataSeason';
import { Player } from '../../entities/Player';
import { Season } from '../../entities/Season';
import { CreatePlayerService } from '../Player/CreatePlayerService';
import { CreateSeasonService } from '../Season/CreateSeasonService';
import { CreateDataSeasonService } from './CreateDataSeasonService';

describe('CreateDataSeasonService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should create a data season with correct parameters', async () => {

        const createDataSeasonService = new CreateDataSeasonService();

        const createPlayerService = new CreatePlayerService();

        const getPlayerId = await createPlayerService.execute({ name: 'Some player' })

        const playerId = getPlayerId[0].player_id

        const createSeasonService = new CreateSeasonService();

        const getSeasonId = await createSeasonService.execute({ name: '2000' })

        const seasonId = getSeasonId[0].season_id

        const result = await createDataSeasonService.execute({ player_id: playerId, season_id: seasonId, games: 3, goals: 1, assists: 2 });

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

        expect(result[0]).toHaveProperty('data_season_id')
        expect(result).toHaveLength(1)
    })
})
