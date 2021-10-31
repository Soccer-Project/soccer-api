import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Player } from '../../entities/Player';
import { CreatePlayerService } from './CreatePlayerService';

describe('CreatePlayerService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })
    
    it('should create a player', async () => {

        const createPlayerService = new CreatePlayerService()

        const response = await createPlayerService.execute({ name: 'Some player' })

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Player)
            .execute()

        expect(response).toMatchObject([{player_id: response[0].player_id}])

    })
})
