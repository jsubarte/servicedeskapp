import { Sequelize, Dialect } from 'sequelize'
import 'dotenv/config'

const dbConnection: Sequelize = new Sequelize(
    {
        database: process.env.DB_NAME || '',
        username: process.env.DB_USER || '',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || '', 
        dialect: (process.env.DB_DIAL || 'postgres') as Dialect,
        port: Number(process.env.DB_PORT),
        logging: false
    }
)

const testConnection = async () => {
    try {
        await dbConnection.authenticate()
        console.log(`Conexion a la base de datos ${ process.env.DB_NAME } establecida con exito`)
    } catch (error) {
        console.log(`Imposible conectar con la base de datos. Error: ${error}`)
        throw new Error()
    }
}

export {
    dbConnection,
    testConnection
}