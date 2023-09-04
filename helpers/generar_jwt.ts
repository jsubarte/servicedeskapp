import jwt from 'jsonwebtoken'

const generarJWT = ( uid: string = '' ): string => {

    try {
        const payload: { uid: string } = { uid }
        const token = jwt.sign( payload, process.env.SECRETORPRIVATEKEY || '', { expiresIn: '8h' } )
        return token
    } catch (error) {
        console.error(error)
        return 'Error en el servidor - generarJWT'
    }
    
}

export {
    generarJWT
}