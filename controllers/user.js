const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usersGet = async (req, res = response) => {

    const {limit = 5, since = 0} = req.query;

    const query = {
        estado:true
    }
    
    const [usuarios, total] = await Promise.all([
        Usuario.find(query)
            .limit(Number(limit))
            .skip(Number(since)),
        
        Usuario.countDocuments(query)
    ]);

    res.json({
        total,
        usuarios
    });
}

const usersPost = async (req, res) => {


    
    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD

    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usersPut = async (req, res) => {

    const {id} = req.params;

    const {_id, password, google, correo, ...resto} = req.body;

    if(password){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({usuario});
}

const usersDelete =  async (req, res) => {
    const {id} = req.params;

    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    return res.json({usuario});
}

module.exports = {
    usersGet,
    usersPost,
    usersPut, 
    usersDelete
}