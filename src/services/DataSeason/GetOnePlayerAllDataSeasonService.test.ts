import { getConnection } from 'typeorm';
import createConnection from '../../database';
import { GetOnePlayerAllDataSeasonService } from './GetOnePlayerAllDataSeasonService';

jest.mock('../../repositories/DataSeasonRepository')
const dataSeasonRepository = require('../../repositories/DataSeasonRepository')
const getOneAllDataSeasonSeason = new GetOnePlayerAllDataSeasonService({
    dataSeasonRepository: dataSeasonRepository,
    playerId: '896fe1b6-5ae4-4da2-a94f-e64d640c09d4'
})

describe('GetOnePlayerAllDataSeasonService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    it('Find a existing data for player', async () => {
        dataSeasonRepository.findByPlayer = jest.fn();

        await getOneAllDataSeasonSeason.execute()

        expect(dataSeasonRepository.findByPlayer).toHaveBeenCalled()
    })    
})