import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Player } from '../../entities/Player';
import { CreatePlayerService } from './CreatePlayerService';
import { GetOnePlayerService } from './GetOnePlayerService';

describe('GetOnePlayerService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should return a player data', async () => {
        const createPlayerService = new CreatePlayerService()
        const getOnePlayerService = new GetOnePlayerService()

        const playerId = await createPlayerService.execute({ name: 'Some player' })

        const response = await getOnePlayerService.execute({ id: playerId[0].player_id })

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Player)
            .execute()

        expect(response).toMatchObject({ 'name': 'Some player' })
    })
})