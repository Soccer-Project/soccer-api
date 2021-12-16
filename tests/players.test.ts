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
    }),

    it('Should return status 200 and player with detailed data', async () => {
      const response = await server.get('/player/8005bfc9-391c-467a-a1f0-93cbeb202351')

      expect(response.status).toBe(200)
      expect(response.data).toMatchObject({
        detailed: [
        {
          "data_season_id": "4bbcba12-bfbb-40d7-bfbe-e564e33de7fc",
          "player_id": "8005bfc9-391c-467a-a1f0-93cbeb202351",
          "season_id": "2c610ceb-e5b4-4930-ac42-66772a0fa20a",
          "games": 49,
          "goals": 6,
          "assists": 7,
          "playerId": {
            "player_id": "8005bfc9-391c-467a-a1f0-93cbeb202351",
            "name": "Vinicius Junior"
          },
          "seasonId": {
            "season_id": "2c610ceb-e5b4-4930-ac42-66772a0fa20a",
            "name": "2020"
          }
        },
        {
          "data_season_id": "a59e8cfe-511f-4a09-ad42-caad7b097f3f",
          "player_id": "8005bfc9-391c-467a-a1f0-93cbeb202351",
          "season_id": "ef564c02-e835-476a-9ccb-d3b16acf4a78",
          "games": 18,
          "goals": 10,
          "assists": 7,
          "playerId": {
            "player_id": "8005bfc9-391c-467a-a1f0-93cbeb202351",
            "name": "Vinicius Junior"
          },
          "seasonId": {
            "season_id": "ef564c02-e835-476a-9ccb-d3b16acf4a78",
            "name": "2021"
          }
        },
        {
          "data_season_id": "f94ac7ba-14f1-492a-adfc-5ca6b7e6362e",
          "player_id": "8005bfc9-391c-467a-a1f0-93cbeb202351",
          "season_id": "f7ac0601-e7fb-42b9-8d07-bb6348780065",
          "games": 38,
          "goals": 5,
          "assists": 4,
          "playerId": {
            "player_id": "8005bfc9-391c-467a-a1f0-93cbeb202351",
            "name": "Vinicius Junior"
          },
          "seasonId": {
            "season_id": "f7ac0601-e7fb-42b9-8d07-bb6348780065",
            "name": "2019"
          }
        }],
        total: {
          "players_player_id": "8005bfc9-391c-467a-a1f0-93cbeb202351",
          "players_name": "Vinicius Junior",
          "assists": "18",
          "games": "105",
          "goals": "21"
        }
      })
  })
})
