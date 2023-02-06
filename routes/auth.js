const { Router }  = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { mailExiste } = require('../helpers/db-validators');


const router = Router();

router.post('/login',
    [
        check('correo','El correo es obligatorio.').not().isEmpty(),
        check('correo','El correo ingresado no es válido.').isEmail(),
        check('password','El password es obligatorio.').not().isEmpty(),
        validarCampos
    ]
, login);



module.exports = router;