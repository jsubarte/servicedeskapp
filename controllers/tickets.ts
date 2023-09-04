import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Response, Request } from 'express'
import { Ticket, TicketComment } from '../models'
import { subirArchivo, validaRol, obtOpciones } from '../helpers'

const obtenerTickets = async (req: Request, res: Response) => {
    try {
        let ticket = []
        const userid = req.usuario?.userid
        const typeRol = await validaRol(userid, 'C')
        const filter: string = typeof req.query.filter !== 'string' ? '' : req.query.filter
        const opciones = await obtOpciones(typeRol, userid, filter)
        ticket = await Ticket.findAll({...opciones, include: { model: TicketComment, as: 'TicketComments' }})
        ticket = ticket.map(
            t => {
                t = typeRol ?
                        {
                            'comentar': t.active == 'Y', 
                            'atender': false,
                            ...t.dataValues
                        }
                        :
                        {
                            'comentar': ( t.attention == userid && t.active == 'Y' ), 
                            'atender': ( t.attention == null && t.active == 'Y' ), 
                            ...t.dataValues
                        }
                if(!!t.filepath) Object.assign(t,{ image: `data:image/gif;base64,${fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../images/', t.filepath), 'base64')}` })
                if(t.TicketComments)
                    t.TicketComments.forEach( tc => {
                        if(!!tc.filepath) Object.assign(tc.dataValues,{ image: `data:image/gif;base64,${fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../images/', tc.filepath), 'base64')}` })
                    })
                return t
            }
        )
        
        res.status(200).json({ ticket })
    } catch (error) {
        console.log(`Error: ${error}`)
        res.status(500).json(`Error: ${error}`)
    }
}

const crearTickets = async (req: Request, res: Response) => {
    try {
        const userid = req.usuario?.userid
        if(await validaRol(userid, 'C')){
            const { description } = req.body

            const nombre = await subirArchivo(req.files)
            const ticket = new Ticket({ description, userid, filepath: nombre })
            
            // Guardar en Base de Datos
            await ticket.save()
    
            res.status(201).json(ticket)
        }
        else{
            res.status(400).json({ msg: 'Usted no puede crear tickets'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(`Error: ${error}`)
    }
}

const atenderTicket = async (req: Request, res: Response) => {
    try {
        const userid = req.usuario?.userid
        const { ticketid } = req.params
        if( await validaRol(userid, 'T') ){
            const ticket = await Ticket.update( { attention: userid }, { where: { ticketid, solved: 'N', active: 'Y', attention: null } } )
            res.status(200).json({ 'msg': `Se actualizo ${ticket} registro(s)` })
        }
        else{
            res.status(401).json({ 'error': `Usted no puede atender tickets` })
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        res.status(500).json(`Error: ${error}`)
    }
}

const actualizarEstadoTicket = async (req: Request, res: Response) => {
    try {
        const userid = req.usuario?.userid
        const { ticketid } = req.params
        let ticket
        if( await validaRol(userid, 'T') ){
            const { active } = req.body
            ticket = await Ticket.update( { active }, { where: { ticketid, attention: userid } } )
        }
        else{
            const { solved } = req.body
            ticket = await Ticket.update( { solved }, { where: { ticketid, userid, active: 'Y' } } )
        }
        res.status(200).json({ 'msg': `Se actualizo ${ticket} registro(s)` })
    } catch (error) {
        console.log(error)
        res.status(500).json(`Error: ${error}`)
    }
}

export{
    obtenerTickets,
    crearTickets,
    atenderTicket,
    actualizarEstadoTicket
}