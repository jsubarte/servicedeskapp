import { validationResult } from 'express-validator'
import { Request, Response, NextFunction, RequestHandler } from 'express'

const validarCampos: RequestHandler = ( req: Request, res: Response, next: NextFunction ) => {
    const errors = validationResult(req)
    if( !errors.isEmpty() ){ 
        res.status(400).json({ success: false, message: 'Bad Request', errors: errors.array() }) 
        return
    }
    next()
}

export {
    validarCampos
}