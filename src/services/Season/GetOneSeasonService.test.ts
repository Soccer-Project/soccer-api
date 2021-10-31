import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { Season } from '../../entities/Season';
import { CreateSeasonService } from './CreateSeasonService';
import { GetOneSeasonService } from './GetOneSeasonService';

describe('GetOneSeasonService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should return a season and id when season exists', async () => {
        const createSeasonService = new CreateSeasonService();
        await createSeasonService.execute({name: '2020'})

        const getOneSeasonService = new GetOneSeasonService();
        const response = await getOneSeasonService.execute({name: '2020'})

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Season)
            .execute()

        expect(response).toMatchObject({
            name: 2020
        })
    })
})