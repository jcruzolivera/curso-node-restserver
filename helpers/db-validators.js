
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error('El rol ingresado no esta registrado.');
    }
}

const mailExiste = async (correo = '')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error("El correo ya esta registrado");
    }
}

const existeUsuarioById = async (id = '')=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error("El usuario con ese ID no esta registrado");
    }
}

module.exports = {
    esRoleValido,
    mailExiste,
    existeUsuarioById
}