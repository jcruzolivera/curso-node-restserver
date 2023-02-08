const { Router }  = require('express');
const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearCategoria, eliminarCategoria, obtenerCategorias, actualizarCategoria, obtenerCategoriaById } = require('../controllers/categorias');

const {existeCategoria} = require('../helpers/db-validators');
const { validarRoles } = require('../middlewares');

const router = Router();


//Public
router.get('/', obtenerCategorias)


//Public
router.get('/:id', [
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoriaById)

//Token auth
router.put('/:id',[ 
    validarJWT,
    check('id').custom(existeCategoria),
    check('nombre').not().isEmpty(),
    validarCampos
], actualizarCategoria)

//Token auth
router.post('/', [ 
    validarJWT,
    check('nombre').not().isEmpty(),
    validarCampos
],  crearCategoria)


//Admin auth
router.delete('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROLE'),
    check('id').custom(existeCategoria)
], eliminarCategoria)



module.exports = router;