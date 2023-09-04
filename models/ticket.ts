import { DataTypes, Model } from 'sequelize'
import { dbConnection } from '../database/config'
import { TicketComment } from './ticketcomments'


class Ticket extends Model{
    declare ticketid: number
    declare created_date: Date
    declare userid: number
    declare description: string
    declare filepath: string
    declare attention: number
    declare solved: string
    declare active: string
    public TicketComments?: TicketComment[]
}

Ticket.init(
    {
        ticketid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        created_date: {
            type: DataTypes.DATE,
            defaultValue: Date.now
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        filepath: {
            type: DataTypes.TEXT
        },
        attention: {
            type: DataTypes.INTEGER
        },
        solved: {
            type: DataTypes.ENUM('Y','N'),
            defaultValue: 'N'
        },
        active: {
            type: DataTypes.ENUM('Y','N'),
            defaultValue: 'Y'
        }
    },
    {
        sequelize: dbConnection,
        timestamps: false,
        modelName: 'Ticket',
        tableName: 'ticket'
    }
)

Ticket.hasMany(TicketComment,{
    foreignKey: 'ticketid',
    as: 'TicketComments'
})

TicketComment.belongsTo(Ticket,{
    foreignKey: 'ticketid'
})

export {
    Ticket
}