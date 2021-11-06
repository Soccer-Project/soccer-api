module.exports = {
    "type": "mysql",
    "host": process.env.DATABASE_HOST,
    "port": 3306,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "entities": [
        `${process.env.NODE_ENV === "production" ? "./dist" : "./src" }/entities/*${process.env.NODE_ENV === "production" ? ".js" : ".ts"}`,
    ],
    "migrations": [
        `${process.env.NODE_ENV === "production" ? "./dist" : "./src" }/database/migrations/*${process.env.NODE_ENV === "production" ? ".js" : ".ts"}`,
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/entities"
    }
}
