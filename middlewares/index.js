const { validarJWT } = require('./validar-jwt');
const { validarRoles } = require('./validar-roles');
const { validarCampos } = require('./validar_campos');

module.exports = {
    validarCampos,
    validarJWT,
    validarRoles
}