
const { Producto, Usuario, categoria, Role } = require('../models');

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

const existeCategoria = async (id = '') => {
    const existeCategoria = await categoria.findById(id);
    if(!existeCategoria){
        throw new Error("Categoria inexistente")
    }
}

const existeProducto = async (id = '') => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error("producto inexistente")
    }
}
module.exports = {
    esRoleValido,
    mailExiste,
    existeUsuarioById,
    existeCategoria,
    existeProducto,
}