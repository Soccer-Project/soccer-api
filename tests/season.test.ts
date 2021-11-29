import axios from 'axios';
import createConnection from '../src/database';

const server = axios.create({
    baseURL: 'http://localhost:5000'
})

describe('/season', () => {
    it('Should create a season when user is authenticated', async () => {
        const response = await server.post('/authuser', { 
            name: 'user', 
            password: '123456' 
        })

        const { token } = response.data
        const headers = { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        const result = await server.post('/season', {
            name: '1990'
        },
        { headers })

        const connection = await createConnection()
        await connection.query(`DELETE FROM seasons WHERE season_id = '${result.data.season_id}'`)
        await connection.close()

        expect(result.status).toBe(200)
        expect(result.data).toMatchObject({
            name: '1990'
        })
    })

    it('Should return status 401 and error message when token is invalid', async () => {
        
        const headers = { 
            'Authorization': `Bearer 1nval1dT0k3n`,
            'Content-Type': 'application/json'
        }

        await server.post('/season', {
            name: '1990'
        },
        { headers })
        .catch(error => {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toMatchObject({ message: 'User not authorized' })
        })
    })
})
