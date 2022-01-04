import { Player } from '../entities/Player'
import getManagerMock from '../__mocks__/getEntityManagerMock'
import { PlayerRepository } from './PlayerRepository'

describe('PlayerRepository', () => {

    const playerMock: Player = new Player()
    playerMock.player_id = 'de29478c-c051-4ee9-b48d-e087ec3cbf80'
    playerMock.name = 'Some player'

    const otherPlayerMock: Player = new Player()
    otherPlayerMock.player_id = 'fg1234-c051-4ee9-b48d-e087ec3cbf78'
    otherPlayerMock.name = 'Other player'

    it('should call getAll method and return all players', async () => {
        const managerMock = await getManagerMock({
            findReturn: [ playerMock, otherPlayerMock ]
        })

        const playerRepository = new PlayerRepository(managerMock);

        const result = await playerRepository.getAll()

        expect(managerMock.find).toHaveBeenCalled()
        expect(result).toMatchObject([playerMock, otherPlayerMock])
    })

    it('should call save method and return a player created', async () => {
        const managerMock = await getManagerMock({
            saveReturn: {
                player_id: playerMock.player_id,
                name: playerMock.name
            }
        })

        const playerRepository = new PlayerRepository(managerMock);

        const player = await playerRepository.save(playerMock)

        expect(managerMock.save).toHaveBeenCalled()
        expect(player).toMatchObject(playerMock)
    })

    it('should call findOne method and return a player when exists', async () => {
        const managerMock = await getManagerMock({
            findOneReturn: playerMock
        })
        
        const playerRepository = new PlayerRepository(managerMock);

        const player = await playerRepository.findById(playerMock.player_id)

        expect(managerMock.findOne).toHaveBeenCalled()
        expect(player).toMatchObject(playerMock)
    })
})
