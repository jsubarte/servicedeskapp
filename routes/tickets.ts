import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos, validarJWT } from '../middlewares'
import { obtenerTickets, crearTickets, atenderTicket, actualizarEstadoTicket } from '../controllers'


export const rtrTicket = Router()

rtrTicket.get('/',
    [
        validarJWT
    ], obtenerTickets
)

rtrTicket.post('/',
    [
        validarJWT,
        check('description','La descripcion es obligatoria').notEmpty(),
        validarCampos
    ], crearTickets
)

rtrTicket.patch('/atender/:ticketid', 
    [
        validarJWT
    ], atenderTicket
)

rtrTicket.patch('/estado/:ticketid', 
    [
        validarJWT,
        check('active','No es un estado valido').optional().isIn(['Y','N']),
        check('solved','No es un estado valido').optional().isIn(['Y','N']),
        validarCampos
    ], actualizarEstadoTicket
)
