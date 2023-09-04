import { Sequelize } from 'sequelize'
import 'dotenv/config'

const dbConnection: Sequelize = new Sequelize(
    {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST, 
        dialect: 'postgres',
        port: Number(process.env.DB_PORT),
        logging: false
    }
)

export {
    dbConnection
}