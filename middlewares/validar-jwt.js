
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req= request, res = response, next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({messagemsg:"No hay token en la request"});
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer usuario
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(500).json({message:"El usuario no existente"});
        }

        if(!usuario.estado){
            return res.status(500).json({message:"El usuario no esta activo"});
        } 

        req.usuario = usuario;

        next();


    } catch (error) {
        res.status(500).json({msg:"No pudo autorizarse al usuario"});
    }
}

module.exports = {validarJWT};