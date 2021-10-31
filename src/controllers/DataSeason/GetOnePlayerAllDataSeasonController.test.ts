import { getConnection } from 'typeorm';
import { Request } from 'express';
import { makeMockResponse } from '../../utils/mocks/mockResponse';
import { makeMockRequest } from '../../utils/mocks/mockRequest';
import createConnection from '../../database';
import { CreatePlayerService } from '../../services/Player/CreatePlayerService';
import { GetOnePlayerAllDataSeasonController } from './GetOnePlayerAllDataSeasonController';
import { CreateSeasonService } from '../../services/Season/CreateSeasonService';
import { CreateDataSeasonService } from '../../services/DataSeason/CreateDataSeasonService';
import { Player } from '../../entities/Player';
import { Season } from '../../entities/Season';
import { DataSeason } from '../../entities/DataSeason';

describe('GetOnePlayerAllDataSeasonController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should return a data when existing a player', async () => {

        const createPlayerService = new CreatePlayerService();
        const createSeasonService = new CreateSeasonService();
        const createDataSeasonService = new CreateDataSeasonService();

        const getOnePlayerAllDataSeasonController = new GetOnePlayerAllDataSeasonController();
        
        const playerId = await createPlayerService.execute({ name: 'Some player'})
        const seasonId = await createSeasonService.execute({ name: '1400' })
        await createDataSeasonService.execute({ player_id: playerId[0].player_id, season_id: seasonId[0].season_id, games: 3, goals: 1, assists: 2 });

        // const request = {
        //     playerId: playerId[0].playerId
        // } as Request;

        const request = makeMockRequest({
            playerId: playerId[0].playerId
        })

        const response = makeMockResponse();

        await getOnePlayerAllDataSeasonController.handle(request, response)

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
