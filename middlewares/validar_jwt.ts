import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Usuario } from '../models'

interface tokenPayload {
    uid: string
    iat: number
    exp: number
}

declare global {
    namespace Express {
      interface Request {
        usuario?: Usuario
      }
    }
}

const validarJWT = async ( req: Request, res: Response, next: NextFunction ) => {
    const token = req.header('x-token')
    if( !token ) return res.status(401).json({error: 'Usted no esta logueado en la aplicación'})
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY || '' ) as tokenPayload

        const usuario = await Usuario.findByPk(uid)

        if ( !usuario || usuario.active === 'N' ) return res.status(401).json({ msg: 'Token no valido' })

        req.usuario = usuario

        next()
    } catch (err) {
        console.error(`Error: ${err}`)
        return err instanceof jwt.JsonWebTokenError ? res.status(401).json({error: 'Token no valido'}) : res.status(500).json({error: 'Error en el servidor'})
    }
}

export{
    validarJWT
}