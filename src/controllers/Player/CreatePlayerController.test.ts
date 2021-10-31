import { getConnection } from 'typeorm';
import { Request } from 'express';
import { makeMockResponse } from '../../utils/mocks/mockResponse';
import createConnection from '../../database';
import { CreatePlayerController } from './CreatePlayerController';
import { Player } from '../../entities/Player';

describe('CreatePlayerController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('should return a id for a new player', async () => {
        const createPlayerController = new CreatePlayerController();

        const request = {
            body: {
                name: 'Some player'
            }
        } as Request;

        const response = makeMockResponse();

        await createPlayerController.handle(request, response);

        const connection = getConnection();
        await connection.createQueryBuilder()
            .delete()
            .from(Player)
            .execute()

        expect(response.state.status).toBe(200)
    })
})
