module.exports = {
    "type": "sqlite",
    "database": `${proces.env.NODE_ENV === "production" ? "./dist" : "./src" }/database/database.sqlite`,
    "entities": [
        `${proces.env.NODE_ENV === "production" ? "./dist" : "./src" }/entities/*${proces.env.NODE_ENV === "production" ? ".js" : ".ts"}`,
    ],
    "migrations": [
        `${proces.env.NODE_ENV === "production" ? "./dist" : "./src" }/database/migrations/*${proces.env.NODE_ENV === "production" ? ".js" : ".ts"}`,
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/entities"
    }
}
