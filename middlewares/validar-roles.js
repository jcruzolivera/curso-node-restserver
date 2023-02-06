const { response } = require("express");

const validarRoles = (...roles) => {
    return (req, res= response, next) => {
        
        if(!req.usuario){
            return res.status(500).json({message:"Hubo un error al verificar el rol"});
        }
    
        const {rol} = req.usuario;
        
        if(!roles.includes(rol)){
            return res.status(401).json({message:"No tienes permisos necesarios"});
        }

        next();
    }
}

module.exports = {
    validarRoles
};