import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos, validarJWT } from '../middlewares'
import { comentarTicket } from '../controllers'

export const rtrTicketComment = Router()

rtrTicketComment.post('/:ticketid',
    [
        validarJWT,
        check('commentary','El comentario es obligatorio').notEmpty(),
        validarCampos
    ], comentarTicket
)
