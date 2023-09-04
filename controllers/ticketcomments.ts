import { Response, Request } from 'express'
import { Ticket, TicketComment } from '../models'
import { validaRol } from '../helpers/db_validators'
import { subirArchivo } from '../helpers'

const comentarTicket = async (req: Request, res: Response) => {
    try {
        const userid = req.usuario?.userid
        const { ticketid } = req.params
        if( await validaRol(userid, 'C') && !(await Ticket.findOne({ where: { ticketid, userid } })) ) return res.status(400).json({ 'msg': `No eres el creador de este ticket no puedes comentar` })
        else if( await validaRol(userid, 'T') && !(await Ticket.findOne({ where: { ticketid, attention: userid } })) ) return res.status(400).json({ 'msg': `No eres el tecnico asgnado a este ticket no puedes comentar` })
        
        const { commentary } = req.body
        const nombre = await subirArchivo(req.files)
        const ticketcomment = new TicketComment( { commentary, userid, ticketid, filepath: nombre } )
        
        // Guardar en Base de Datos
        await ticketcomment.save()
        
        res.status(201).json(ticketcomment)
    } catch (error) {
        console.log(error)
        res.status(500).json(`Error: ${error}`)
    }
}

export{
    comentarTicket
}