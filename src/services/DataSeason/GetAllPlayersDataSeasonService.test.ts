import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { DataSeason } from '../../entities/DataSeason';
import { Player } from '../../entities/Player';
import { Season } from '../../entities/Season';
import { CreatePlayerService } from '../Player/CreatePlayerService';
import { CreateSeasonService } from '../Season/CreateSeasonService';
import { CreateDataSeasonService } from './CreateDataSeasonService';
import { GetAllPlayersDataSeasonService } from './GetAllPlayersDataSeasonService';

describe('GetAllPlayersDataSeasonService', () => {
    jest.setTimeout(50000)

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should return all datas with players and seasons', async () => {

        const getAllPlayersDataSeason = new GetAllPlayersDataSeasonService();

        const createDataSeasonService = new CreateDataSeasonService();

        const createPlayerService = new CreatePlayerService();

        const getPlayerId = await createPlayerService.execute({ name: 'Some player' })
        const getPlayerId2 = await createPlayerService.execute({ name: 'Another player' })

        const playerId = getPlayerId[0].player_id
        const playerId2 = getPlayerId2[0].player_id

        const createSeasonService = new CreateSeasonService();

        const getSeasonId = await createSeasonService.execute({ name: '1700' })
        const getSeasonId2 = await createSeasonService.execute({ name: '1701' })

        const seasonId = getSeasonId[0].season_id
        const seasonId2 = getSeasonId2[0].season_id

        await createDataSeasonService.execute({ player_id: playerId, season_id: seasonId, games: 3, goals: 1, assists: 2 });
        await createDataSeasonService.execute({ player_id: playerId, season_id: seasonId2, games: 1, goals: 2, assists: 1 });
        await createDataSeasonService.execute({ player_id: playerId2, season_id: seasonId, games: 2, goals: 3, assists: 2 });
        await createDataSeasonService.execute({ player_id: playerId2, season_id: seasonId2, games: 4, goals: 2, assists: 3 });

        const response = await getAllPlayersDataSeason.execute()

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

        expect(response).toMatchObject([
            {players_name: 'Some player', games: 4, goals: 3, assists: 3}, 
            {players_name: 'Another player', games: 6, goals: 5, assists: 5}
        ])

    })
})