module.exports = {
    "type": "mysql",
    "url": `mysql2://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:3306/${process.env.DATABASE_NAME}?sslca=config/amazon-rds-ca-cert.pem`,
    "host": process.env.DATABASE_HOST,
    "port": 3306,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "entities": [
        `src/entities/*${process.env.NODE_ENV === "production" ? ".js" : ".ts"}`,
    ],
    "migrations": [
        `src/database/migrations/*${process.env.NODE_ENV === "production" ? ".js" : ".ts"}`,
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/entities"
    }
}
