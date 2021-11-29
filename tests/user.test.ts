import axios from 'axios';

const server = axios.create({
    baseURL: 'http://localhost:5000'
})

describe('/user', () => {
    it('Should return status 200 and token when user is authenticated', async() => {
        const response = await server.post('/authuser', { 
            name: 'user', 
            password: '123456' 
        })

        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty('token')
    })

    it('Should return status 401 and error message when user fill wrong password', async() => {
        await server.post('/authuser', { 
            name: 'user', 
            password: 'wrongPassword' 
        })
        .catch(error => {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toMatchObject({ message: 'Not authenticated!' })
        })
    })

    it('Should return status 401 and error message when user fill wrong user', async() => {
        await server.post('/authuser', { 
            name: 'userWrong', 
            password: '123456' 
        })
        .catch(error => {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toMatchObject({ message: 'Not authenticated!' })
        })
    })

    it('Should return status 401 and error message when user fill wrong user and password', async() => {
        await server.post('/authuser', { 
            name: 'userWrong', 
            password: 'wrongPassword' 
        })
        .catch(error => {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toMatchObject({ message: 'Not authenticated!' })
        })
    })
})
