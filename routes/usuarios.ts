import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos, validarJWT } from '../middlewares'
import { updateUser, deleteUser, register, login } from '../controllers'
import { emailExiste } from '../helpers'


const rtrUsuario = Router()

rtrUsuario.post('/register',
    [
        check('name', 'El nombre es obligatorio y no puede ser numero').notEmpty().isAlpha('es-ES'),
        check('lastname', 'El apellido es obligatorio y no puede ser numero').notEmpty().isAlpha('es-ES'),
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('email').custom(emailExiste),
        check('password', `Minimo: 8 caracteres, 1 minuscula, 1 mayuscula, 1 numero, 1 caracter especial`).isStrongPassword(),
        check('phone', 'El telefono es obligatorio').notEmpty(),
        check('role', 'No es un rol permitido').isIn(['C','T','']),
        check('active', 'No es un valor permitido para active').isIn(['Y','N','']),
        validarCampos
    ], register 
)

rtrUsuario.post('/login', [
    check('email', 'El correo es obligatorio').notEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
], login)

rtrUsuario.patch('/:id', 
    [
        validarJWT,
        validarCampos
    ], updateUser 
)

rtrUsuario.delete('/:id', 
    [
        validarJWT,
        validarCampos
    ], deleteUser 
)

export { rtrUsuario }