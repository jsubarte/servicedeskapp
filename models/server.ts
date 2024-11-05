import express, { Application } from 'express'
import cors from 'cors'
import { rtrUsuario, rtrTicket, rtrTicketComment } from '../routes'
import fileUpload from 'express-fileupload'
import { testConnection } from '../database/config'

interface Routes {
    usuarios: string
    tickets: string
    ticketcomment: string
}

class Server{
    app: Application
    host: string
    port: number
    paths: Routes
    
    constructor(){
        this.app = express()
        this.host = process.env.HOST || 'DESKTOP-4A3F1KT'
        this.port = parseInt(process.env.PORT || '3001')
        this.paths = {
            usuarios: '/api/usuarios',
            tickets: '/api/tickets',
            ticketcomment: '/api/ticketcomment'
        }

        // Middlewares
        this.middleware()

        // Documentacion Swagger
        //this.docSwagger()

        // Rutas de mi aplicacion
        this.routes()
    }

    middleware(){
        //CORS
        this.app.use(cors())

        // Lectura y Parseo del Body
        this.app.use(express.json())

        //File Upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))
    }

    routes(){
        this.app.use(this.paths.usuarios, rtrUsuario)
        this.app.use(this.paths.tickets, rtrTicket)
        this.app.use(this.paths.ticketcomment, rtrTicketComment)
    }

    listen(){
        this.app.listen(this.port, this.host, () => {
            try {
                console.log(`Aplicacion ejecutandose en ${ this.host } en el puerto ${ this.port }`)
                testConnection()
            } catch (error) {
                console.log(`Error listen: ${error}`)
            }
        })
    }

}

export {
    Server
}
