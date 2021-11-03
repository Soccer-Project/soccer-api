import { Player } from '../entities/Player'
import getManagerMock from '../__mocks__/getEntityManagerMock'
import { PlayerRepository } from './PlayerRepository'

describe('PlayerRepository', () => {
    it('should call getAll method', async () => {
        const managerMock = await getManagerMock({})
        const playerRepository = new PlayerRepository(managerMock);

        playerRepository.getAll()

        expect(managerMock.find).toHaveBeenCalled()
    })

    it('should call save method', async () => {
        const managerMock = await getManagerMock({})
        const playerRepository = new PlayerRepository(managerMock);

        playerRepository.save(new Player())

        expect(managerMock.save).toHaveBeenCalled()
    })
})
