import axios from 'axios';

const server = axios.create({
    baseURL: 'http://localhost:5000'
})

describe('/players', () => {
    
    it('Should return status 200 and list of players with data', async () => {
        const response = await server.get('/players')

        expect(response.status).toBe(200)
        expect(response.data).toMatchObject([
            {
              "players_player_id": "8005bfc9-391c-467a-a1f0-93cbeb202351",
              "players_name": "Vinicius Junior",
              "games": "105",
              "goals": "21",
              "assists": "18"
            },
            {
              "players_player_id": "89558c13-f4e0-4c9b-928a-29a129404e25",
              "players_name": "Messi",
              "games": "101",
              "goals": "73",
              "assists": "43"
            },
            {
              "players_player_id": "0ea3f9a9-73cd-4df7-89f5-52a98ae8e4f2",
              "players_name": "Neymar",
              "games": "71",
              "goals": "39",
              "assists": "26"
            },
            {
              "players_player_id": "c5159dfc-5431-4c6a-bfb2-c753c4d56034",
              "players_name": "Gabriel Barbosa",
              "games": "79",
              "goals": "48",
              "assists": "15"
            }
          ])
    })
})
