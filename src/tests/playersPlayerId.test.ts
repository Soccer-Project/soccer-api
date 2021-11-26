import axios from 'axios';

const server = axios.create({
    baseURL: 'http://localhost:5000'
})

describe('/players/:playerId', () => {
    
    it('Should return status 200 and player with detailed data', async () => {
        const response = await server.get('/players/8005bfc9-391c-467a-a1f0-93cbeb202351')

        expect(response.status).toBe(200)
        expect(response.data).toMatchObject([
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
          }
        ])
    })
})
