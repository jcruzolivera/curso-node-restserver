const { Router }  = require('express');
const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {existeProducto} = require('../helpers/db-validators');
const { validarRoles } = require('../middlewares');
const { crearProducto, actualizarProducto ,obtenerProductoById, obtenerProductos, eliminarProducto } = require('../controllers/productos')

const router = Router();


//Public
router.get('/', obtenerProductos)


//Public
router.get('/:id', [
    check('id').custom(existeProducto),
    validarCampos
], obtenerProductoById)

//Token auth
router.put('/:id',[ 
    validarJWT,
    check('id').custom(existeProducto),
    check('nombre').not().isEmpty(),
    validarCampos
], actualizarProducto)

//Token auth
router.post('/', [ 
    validarJWT,
    check('nombre').not().isEmpty(),
    validarCampos
],  crearProducto)


//Admin auth
router.delete('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROLE'),
    check('id').custom(existeProducto)
], eliminarProducto)



module.exports = router;