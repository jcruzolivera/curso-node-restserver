const { Router }  = require('express');

const {check} = require('express-validator');

const { usersGet, usersPost, usersDelete, usersPut } = require('../controllers/user');
const { esRoleValido, mailExiste, existeUsuarioById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar_campos');
const router = Router();

router.get('/', usersGet)

router.post('/',[
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    check('password','El password es obligatorio y debe tener +6 letras.').isLength(6),
    check('correo','El correo ingresado no es válido.').isEmail(),
    check('correo','El correo ingresado no es válido.').custom( mailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usersPost);  

router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usersPut);

router.delete('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usersDelete);

module.exports = router;