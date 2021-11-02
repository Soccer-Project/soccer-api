import getManagerMock from '../utils/mocks/getEntityManagerMock'

import { Player } from '../entities/Player'
import { PlayerRepository } from './PlayerRepository'

describe('PlayerRepository', () => {
    it('should call getAll method', async () => {
        const managerMock = await getManagerMock({})
        const playerRepository = new PlayerRepository(managerMock);

        playerRepository.getAll()

        expect(managerMock.find).toHaveBeenCalled()
    })
})