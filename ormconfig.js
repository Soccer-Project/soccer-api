module.exports = {
    "type": "mysql",
    "url": `mysql2://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:3306/${process.env.DATABASE_NAME}?sslca=config/amazon-rds-ca-cert.pem`,
    "host": process.env.DATABASE_HOST,
    "port": 3306,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "entities": [
        process.env.NODE_ENV === 'dev' ?
            "src/entities/*.ts" :
            "build/entities/*.js"
    ],
    "migrations": [
        process.env.NODE_ENV === 'dev' ?
            "src/database/migrations/*.ts" :
            "build/database/migrations/*.js"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/entities"
    }
}
