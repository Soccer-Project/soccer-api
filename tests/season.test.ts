import axios from 'axios';
import createConnection from '../src/database';

const server = axios.create({
    baseURL: 'http://localhost:5000'
})

let season

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
        connection.close()

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

describe('/season/data', () => {
    jest.setTimeout(20000)

    beforeAll(async () => {
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
            name: '1991'
        },
        { headers })
        
        season = result.data.season_id
    })

    it('Should create a data off season for player when user is authenticated', async () => {
        const response = await server.post('/authuser', { 
            name: 'user', 
            password: '123456' 
        })

        const { token } = response.data
        const headers = { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        const result = await server.post('/season/data', {
            player_id: '8005bfc9-391c-467a-a1f0-93cbeb202351', 
            season_id: season,
            games: 5, 
            goals: 4, 
            assists: 1
        },
        { headers })

        const connection = await createConnection()
        await connection.query(`DELETE FROM dataSeason WHERE data_season_id = '${result.data.data_season_id}'`)
        await connection.query(`DELETE FROM seasons WHERE season_id = '${season}'`)
        connection.close()

        expect(result.status).toBe(200)
        expect(result.data).toMatchObject({
            data_season_id: result.data.data_season_id,
            player_id: '8005bfc9-391c-467a-a1f0-93cbeb202351',
            season_id: season,
            games: 5,
            goals: 4,
            assists: 1
        })
    })

    it('Should return status 401 and error message when token is invalid', async () => {
    
        const headers = { 
            'Authorization': `Bearer 1nval1dT0k3n`,
            'Content-Type': 'application/json'
        }

        await server.post('/season/data', {
            player_id: '8005bfc9-391c-467a-a1f0-93cbeb202351', 
            season_id: season,
            games: 5, 
            goals: 4, 
            assists: 1
        },
        { headers })
        .catch(error => {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toMatchObject({ message: 'User not authorized' })
        })
    })
})

describe('/seasons', () => {
    it('Should return status 200 and all seasons', async () => {
        const response = await server.get('/seasons')

        expect(response.status).toBe(200)
        expect(response.data).toMatchObject([
            {
                season_id: 'f7ac0601-e7fb-42b9-8d07-bb6348780065',
                name: '2019'
            },
            {
                season_id: '2c610ceb-e5b4-4930-ac42-66772a0fa20a',
                name: '2020'
            },
            {
                season_id: 'ef564c02-e835-476a-9ccb-d3b16acf4a78',
                name: '2021'
            }
        ])
    })
})
