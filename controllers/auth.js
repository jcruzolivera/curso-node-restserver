const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const generarJWT = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const {correo, password} = req.body;

    try{
        const usuario = await Usuario.findOne({correo});

        //Verificar correo
        if(!usuario) {
            return res.status(400).json({
                message:"El usuario con ese correo no existe"
            });
        }

        if(!usuario.estado) {
            return res.status(400).json({
                message:"El usuario con ese correo no existe"
            });
        }


        //Verificar password
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        
        if(!validPassword) {
            return res.status(400).json({
                message:"El password no es correcto"
            });
        }


        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });    
 
    }catch(err){
        res.status(500).json({
            msg:'algo saio mal',
            err
        });    
 
    }
  
    
}

module.exports = {
    login
}