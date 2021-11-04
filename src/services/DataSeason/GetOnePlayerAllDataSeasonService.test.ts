import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { GetOnePlayerAllDataSeasonService } from './GetOnePlayerAllDataSeasonService';

jest.mock('../../repositories/DataSeasonRepository')
const dataSeasonRepositoryMock = require('../../repositories/DataSeasonRepository')
const getOneAllDataSeasonService = new GetOnePlayerAllDataSeasonService({
    dataSeasonRepository: dataSeasonRepositoryMock,
    playerId: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4'
})

describe('GetOnePlayerAllDataSeasonService', () => {
    beforeAll(async () => {
        await createConnection();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('Find a existing data for player', async () => {
        dataSeasonRepositoryMock.findByPlayer = jest.fn();

        await getOneAllDataSeasonService.execute()

        expect(dataSeasonRepositoryMock.findByPlayer).toHaveBeenCalled()
    })    
})