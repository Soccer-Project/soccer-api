import { User } from '../entities/User';
import getManagerMock from '../__mocks__/getEntityManagerMock';
import { UserRepository } from './UserRepository';

describe('UserRepository', () => {

    const userReturned = new User()
    userReturned.user_id = '896fe1b6-5ae4-4da2-a94f-e64d640c09d4'
    userReturned.name = 'Some user'
    userReturned.password = '123456'
    userReturned.admin = true

    const userExpected = new User()
    userExpected.user_id = '896fe1b6-5ae4-4da2-a94f-e64d640c09d4'
    userExpected.name = 'Some user'
    userExpected.password = '123456'
    userExpected.admin = true
    it('should return a user admin when name and password match', async () => {
        
        const managerMock = await getManagerMock({
            findReturn: [userReturned]
        })

        const userRepository = new UserRepository(managerMock);

        const user = await userRepository.findByName(userReturned.name, userReturned.password)

        expect(managerMock.find).toHaveBeenCalled()
        expect(user).toMatchObject([userExpected])
    })

    it('should return a empty array when user not is admin', async () => {
        userReturned.admin = false

        const managerMock = await getManagerMock({
            findReturn: []
        })

        const userRepository = new UserRepository(managerMock);

        const user = await userRepository.findByName(userReturned.name, userReturned.password)

        expect(managerMock.find).toHaveBeenCalled()
        expect(user).toMatchObject([])
    })

    it('should return a empty array password not match with exists password', async () => {
        userReturned.password = '1234'

        const managerMock = await getManagerMock({
            findReturn: []
        })

        const userRepository = new UserRepository(managerMock);

        const user = await userRepository.findByName(userExpected.name, userExpected.password)

        expect(managerMock.find).toHaveBeenCalled()
        expect(user).toMatchObject([])
    })

    it('should return a empty array when user does not exist', async () => {
        userReturned.name = 'Another user'

        const managerMock = await getManagerMock({
            findReturn: []
        })

        const userRepository = new UserRepository(managerMock);

        const user = await userRepository.findByName(userExpected.name, userExpected.password)

        expect(managerMock.find).toHaveBeenCalled()
        expect(user).toMatchObject([])
    })
})