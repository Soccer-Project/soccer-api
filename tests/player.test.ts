import axios from 'axios';
import createConnection from '../src/database';

const server = axios.create({
    baseURL: 'http://localhost:5000'
})

describe('/players', () => {
    it('Should create a player when user is authenticated', async () => {
        const response = await server.post('/authuser', { 
            name: 'user', 
            password: '123456' 
        })

        const { token } = response.data
        const headers = { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        const result = await server.post('/player', {
            name: 'Some player'
        },
        { headers })

        const connection = await createConnection()
        await connection.query(`DELETE FROM players WHERE player_id = '${result.data.player_id}'`)
        await connection.close()

        expect(result.status).toBe(200)
        expect(result.data).toMatchObject({
            name: 'Some player'
        })
    })

    it('Should return status 401 and error message when token is invalid', async () => {
        
        const headers = { 
            'Authorization': `Bearer 1nval1dT0k3n`,
            'Content-Type': 'application/json'
        }

        await server.post('/player', {
            name: 'Some player'
        },
        { headers })
        .catch(error => {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toMatchObject({ message: 'User not authorized' })
        })
    })
})
