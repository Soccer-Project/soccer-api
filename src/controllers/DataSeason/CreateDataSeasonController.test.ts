import { getConnection } from 'typeorm';
import { Request } from 'express';
import { makeMockResponse } from '../../utils/mocks/mockResponse';
import createConnection from '../../database';
import { CreateDataSeasonController } from './CreateDataSeasonController';
import { CreatePlayerService } from '../../services/Player/CreatePlayerService';
import { CreateSeasonService } from '../../services/Season/CreateSeasonService';
import { DataSeason } from '../../entities/DataSeason';
import { Season } from '../../entities/Season';
import { Player } from '../../entities/Player';

describe('CreateDataSeasonController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should return a id when a data add to season is successful', async () => {
        const createDataSeasonController = new CreateDataSeasonController();

        const createPlayerService = new CreatePlayerService();

        const getPlayerId = await createPlayerService.execute({ name: 'Some player' })

        const playerId = getPlayerId[0].player_id

        const createSeasonService = new CreateSeasonService();

        const getSeasonId = await createSeasonService.execute({ name: '1800' })

        const seasonId = getSeasonId[0].season_id

        const request = {
            body: {
                player_id: playerId,
                season_id: seasonId,
                games: 3,
                goals: 1,
                assists: 2
            }
        } as Request;

        const response = makeMockResponse();

        await createDataSeasonController.handle(request, response)

        const connection = getConnection();
        await connection.createQueryBuilder()
            .delete()
            .from(DataSeason)
            .execute()

        await connection.createQueryBuilder()
            .delete()
            .from(Season)
            .execute()

        await connection.createQueryBuilder()
            .delete()
            .from(Player)
            .execute()

        expect(response.state.status).toBe(200)
    })
})