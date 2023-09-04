import { DataTypes, Model } from 'sequelize'
import { dbConnection } from '../database/config'

class Usuario extends Model{
    declare password: string
    declare userid: number
    declare name: string
    declare lastname: string
    declare email: string
    declare company: string
    declare phone: string
    declare role: string
    declare active: string
}

Usuario.init(
    {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        company: {
            type: DataTypes.TEXT
        },
        phone: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('C','T'),
            defaultValue: 'C'
        },
        active: {
            type: DataTypes.ENUM('Y','N'),
            defaultValue: 'Y'
        }
    },
    {
        sequelize: dbConnection,
        timestamps: false,
        modelName: 'Usuario',
        tableName: 'usuario'
    }
)

export {
    Usuario
}