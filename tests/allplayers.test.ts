import axios from 'axios';

const server = axios.create({
    baseURL: 'http://localhost:5000'
})

describe('/allplayers', () => {
    
    it('Should return status 200 and list of players', async () => {
        const response = await server.get('/allplayers')

        expect(response.status).toBe(200)
        expect(response.data).toMatchObject([
            {
              "player_id": "0ea3f9a9-73cd-4df7-89f5-52a98ae8e4f2",
              "name": "Neymar"
            },
            {
              "player_id": "8005bfc9-391c-467a-a1f0-93cbeb202351",
              "name": "Vinicius Junior"
            },
            {
              "player_id": "89558c13-f4e0-4c9b-928a-29a129404e25",
              "name": "Messi"
            },
            {
              "player_id": "c5159dfc-5431-4c6a-bfb2-c753c4d56034",
              "name": "Gabriel Barbosa"
            }
          ])
    })
})
