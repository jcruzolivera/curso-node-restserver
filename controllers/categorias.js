
const {response} = require('express');

const { Categoria } = require('../models')

const crearCategoria = async (req, res = response) => {

    try {

        const nombre = req.body.nombre.toUpperCase();
    
        const existeCategoria = await Categoria.findOne({nombre});
    
        if(existeCategoria){
            return res.status(400).json({
                msg: "Ya existe una categoria con ese nombre",
                nombre
            })
        }
    
        const data = {
            nombre,
            usuario: req.usuario._id
        }
    
        const categoria = new Categoria(data);

        await categoria.save()

        res.status(201).json({
            msg: "Categoria creada exitosamente"
        })
        
    } catch (error) {
        res.status(500).json({
            error
        })
    }

}


const obtenerCategorias = async (req, res = response) => {
    const categorias = await Categoria.find({});
    
    if(!categorias){
        return res.status(400).json({
            msg: "No se encontraron categorias"
        })
    }
    
    res.json({
        categorias
    })
}


const obtenerCategoriaById = async (req, res = response) => {
    
    const {id} = req.params;
    
    const categoria = await Categoria.findById(id);
    
    if(!categoria){
        return res.status(400).json({
            msg: "No se encontro la categoria con id especificado",
            id
        })
    }
    
    res.json({
        categoria
    })
}


const actualizarCategoria = async (req, res = response) => {
  
    const {id} = req.params;

    const {nombre} = req.body;
    
    const categoria = await Categoria.findByIdAndUpdate(id, {nombre});
    
    if(!categoria){
        return res.status(400).json({
            msg: "No se encontro la categoria con id especificado",
            id
        })
    }
    
    res.json({
        categoria,
        msg:"Se actualizo la categoria correctamente"
    })
}

const eliminarCategoria = async (req, res = response) => {
  
    const {id} = req.params;
    
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});
    
    if(!categoria){
        return res.status(400).json({
            msg: "No se encontro la categoria con id especificado",
            id
        })
    }
    
    res.json({
        categoria,
        msg:"Se elimino la categoria correctamente"
    })
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaById,
    actualizarCategoria,
    eliminarCategoria
}