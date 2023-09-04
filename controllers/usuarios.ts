import { Request, Response } from 'express'
import { Usuario } from '../models'
import { generarJWT } from '../helpers/generar_jwt'
import pkg from 'bcryptjs'

const bcryptjs = pkg

const register = async ( req: Request, res: Response ) => {
    try {
        const {name, password, lastname, email, phone, role, active, company} = req.body

        const usuario: Usuario = new Usuario({name, password, lastname, email, phone, role, active, company})

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        usuario.password = bcryptjs.hashSync( password, salt )
        
        // Guardar en Base de Datos
        await usuario.save()

        res.status(201).json(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).json(`Error: ${error}`)
    }
}

const login = async ( req: Request, res: Response ) => {

    const { email, password } = req.body

    try {
        // Verificar si el correo existe
        const usuario: Usuario | null = await Usuario.findOne({where: { email }})
        if( !usuario ) return res.status(400).json({ msg: `Usuario o Contraseña incorrectos`})

        // Verificar si el usuario esta activo
        if( usuario.active === 'N' ) return res.status(400).json({ msg: `Usuario o Contraseña incorrectos`})

        // Verificar la contraseña
        const validPass: boolean = bcryptjs.compareSync(password, usuario.password)
        if( !validPass ) return res.status(400).json({ msg: `Usuario o Contraseña incorrectos`})

        // Generar JWT
        const token: string = generarJWT(usuario.userid.toString())

        res.json({
            token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(`Error: ${error}`)
    }
}

const updateUser = async( req: Request, res: Response ) => {
    try {
        const { id } = req.params
        
        if( id === req.usuario?.userid.toString() ){
            const { userid, password, email, ...resto } = req.body
    
            if ( password ){
                // Encriptar la contraseña
                const salt = bcryptjs.genSaltSync()
                resto.password = bcryptjs.hashSync( password, salt )
            }

            const usuario = await Usuario.update({...resto},{ where: { userid: id } })
    
            res.status(200).json({ 'msg': `Se actualizo ${usuario} registro(s)`})
        }
        else{
            res.status(401).json({ 'msg': 'Usted no esta autorizado para realizar esta acción' })
        }
    } catch (error) {
        console.error(`Error: ${error}`)
        res.status(500).json(`Error: ${error}`)
    }
}

const deleteUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params

        if(id === req.usuario?.userid.toString()){
            
            const usuario = await Usuario.update({active: 'N'}, { where: { userid: id } })
    
            res.status(200).json({ 'msg': `Se elimino ${usuario} registro(s)`})
        }
        else{
            res.status(401).json({ 'msg': 'Usted no esta autorizado para realizar esta acción' })
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        res.status(500).json(`Error: ${error}`)
    }
}

export{
    register,
    updateUser,
    deleteUser,
    login
}