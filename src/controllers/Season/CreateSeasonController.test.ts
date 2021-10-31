import { getConnection } from 'typeorm';
import { Request } from 'express';
import { makeMockResponse } from '../../utils/mocks/mockResponse';
import createConnection from '../../database';
import { CreateSeasonController } from './CreateSeasonController';
import { Season } from '../../entities/Season';

describe('CreateSeasonController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should return a id for a new season', async () => {
        const createSeasonController = new CreateSeasonController();

        const request = {
            body: {
                name: '1900'
            }
        } as Request;

        const response = makeMockResponse();

        await createSeasonController.handle(request, response);

        const connection = getConnection();
        await connection.createQueryBuilder()
            .delete()
            .from(Season)
            .execute()

        expect(response.state.status).toBe(200)
    })

    it('should return a error when try to create a existing season', async () => {
        const createSeasonController = new CreateSeasonController();

        const request = {
            body: {
                name: '1900'
            }
        } as Request;

        const response = makeMockResponse();

        await createSeasonController.handle(request, response);
        const result = await createSeasonController.handle(request, response);

        const connection = getConnection();
        await connection.createQueryBuilder()
            .delete()
            .from(Season)
            .execute()

        expect(response.state.status).toBe(500)
        expect(response.state.json).toMatchObject({ message: 'season already exists' })
    })
})