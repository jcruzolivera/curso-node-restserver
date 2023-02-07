const {response, json} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const generarJWT = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {

    const {id_token} = req.body;

    try {
        const {name, picture, email} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo:email});

        if(!usuario) {
            const data = {
                nombre: name,
                password: ':P',
                correo: email,
                img: picture,
                google:true,
                rol:'USER_ROLE'
            };
            usuario = new Usuario(data);
            await usuario.save();
        }
        
        if(!usuario.estado) {
            return res.status(401).json({message:"Usuario bloqueado"})
        }

        const token = await generarJWT( usuario.id);

        res.json({usuario, token});
    
    } catch (error) {
        res.status(400).json({msg:'error', error})
    }
}

module.exports = {
    login,
    googleSignIn
}