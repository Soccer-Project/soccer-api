import { getConnection } from 'typeorm';
import { Request } from 'express';
import { makeMockResponse } from '../../utils/mocks/mockResponse';
import createConnection from '../../database';
import { DataSeason } from '../../entities/DataSeason';
import { Player } from '../../entities/Player';
import { Season } from '../../entities/Season';
import { CreatePlayerService } from '../../services/Player/CreatePlayerService';
import { CreateSeasonService } from '../../services/Season/CreateSeasonService';
import { CreateDataSeasonService } from '../../services/DataSeason/CreateDataSeasonService';
import { GetAllPlayersDataSeasonController } from './GetAllPlayersDataSeasonController'

describe('GetAllPlayersDataSeasonController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should return all data in the database', async () => {
        const request = {
            body: {}
        } as Request;

        const response = makeMockResponse();

        const getAllPlayerDataSeasonController = new GetAllPlayersDataSeasonController();

        const createDataSeasonService = new CreateDataSeasonService();

        const createPlayerService = new CreatePlayerService();

        const getPlayerId = await createPlayerService.execute({ name: 'Some player' })
        const getPlayerId2 = await createPlayerService.execute({ name: 'Another player' })

        const playerId = getPlayerId[0].player_id
        const playerId2 = getPlayerId2[0].player_id

        const createSeasonService = new CreateSeasonService();

        const getSeasonId = await createSeasonService.execute({ name: '2000' })
        const getSeasonId2 = await createSeasonService.execute({ name: '2001' })

        const seasonId = getSeasonId[0].season_id
        const seasonId2 = getSeasonId2[0].season_id

        await createDataSeasonService.execute({ player_id: playerId, season_id: seasonId, games: 3, goals: 1, assists: 2 });
        await createDataSeasonService.execute({ player_id: playerId2, season_id: seasonId2, games: 4, goals: 2, assists: 3 });

        await getAllPlayerDataSeasonController.handle(request, response);

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

        expect(response.state.status).toBe(200)
    })
})