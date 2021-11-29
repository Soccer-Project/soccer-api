# Soccer API

#### This is API is part of Soccer Project

### This is project use
- Node
- Typescript
- Jest
- SQLite

### How to run a Project

1 - Clone the repository

2 - Install all dependencies

---
    yarn install
---

3 - Run a database migration

---
    yarn typeorm migration:run
---

4 - Access the main route

<http://localhost:5000/>

### endpoints

**_GET_** /allplayers

Return all players and general stats information

**_GET_** /player/:playerId

Return a specific player with stats detailed for season

playerId receive a string parameter, with the value of the player in database

##### Request example

---
    http://localhost:5000/player/1c93d8cc-9890-4475-964f-e58beb84f7c0
---

**_POST_** /player

Create a player and return your id in response

##### Request example

---
    body {
        name: 'Vinicius Junior'
    }
---

**_POST_** /season

Create a season and return your id in response

##### Request example

---
    body {
        name: '2020'
    }
---

**_POST_** /season/data

Create a data about specific season for a specific player
To creata a data, need season and player existis in database

player_id receive a id of player in database
season_id receive a id of season in database
games, goals and assists receive a number value on body

##### Request example

---
    body {
        player_id: '1c93d8cc-9890-4475-964f-e58beb84f7c0',
        season_id: 'f726c6be-f2c6-47c6-931c-8962afa04860'
        games: 3,
        goals: 2,
        assists: 1
    }
---
