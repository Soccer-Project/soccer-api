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

    it('should return a player when exists', async () => {
        const playerReturned = new Player();
        playerReturned.player_id = '896fe1b6-5ae4-4da2-a94f-e64d640c09d4'
        playerReturned.name = 'Some player'

        const managerMock = await getManagerMock({
            findOneReturn: playerReturned
        })
        
        const playerRepository = new PlayerRepository(managerMock);

        const player = await playerRepository.findById('896fe1b6-5ae4-4da2-a94f-e64d640c09d4')

        const playerExpected = new Player();
        playerExpected.player_id = '896fe1b6-5ae4-4da2-a94f-e64d640c09d4'
        playerExpected.name = 'Some player'

        expect(managerMock.findOne).toHaveBeenCalled()
        expect(player).toMatchObject(playerExpected)
    })

    it('should throw error when not find partner by id', async () => {
        const managerMock = await getManagerMock({
            findOneReturn: undefined
        })
        const playerRepository = new PlayerRepository(managerMock);

        try {
            await playerRepository.findById('896fe1b6-5ae4-4da2-a94f-e64d640c09d4')
        } catch (error) {
            expect(error).toMatchObject({mesage: 'Player not found!'})
        }
    })
})
