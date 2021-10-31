import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Season } from '../../entities/Season';
import { CreateSeasonService } from './CreateSeasonService';

describe('CreateSeasonService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    const createSeasonService = new CreateSeasonService();

    it('should return a season_id when creating a new season', async () => {
        const response = await createSeasonService.execute({ name: '2020'})

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Season)
            .execute()

        expect(response).toMatchObject([{season_id: response[0].season_id}])
    })
})
