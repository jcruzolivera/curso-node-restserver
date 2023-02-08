const { response } = require('express')

const { Producto, Usuario, Categoria } = require('../models');

const crearProducto = async (req, res = response) => {
    try {
     
        const data = req.body;
        
        const categoria = await Categoria.findById(data.categoria)

        if(!categoria) {
            res.status(401).json({
                msg: "No se encontro la categoria con id especificado",
                categoriaId
            })
        }

        data.usuario = req.usuario._id

        const producto = new Producto(data)

        await producto.save()

        res.json({
            msg:"Producto creado exitosamente",
            producto
        })
    
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

const obtenerProductos = async (req, res = response) => {
    
    const {limit = 5, since = 0} = req.query
    
    const productos = await Producto
        .find({estado: true})
            .limit(Number(limit))
            .skip(Number(since))

    if(!productos) {
        return res.status(404).json({
            msg: "No se encontraron los productos"
        })
    }
    res.json({productos, limit, since, total: productos.length})
}

const obtenerProductoById = async (req, res = response) => {
    
    const {id} = req.params
    
    const producto = await Producto.findById(id)

    if(!producto) {
        return res.status(404).json({
            msg: "No se encontro el producto con ese id",
            id
        })
    }
    res.json({producto})
}

const actualizarProducto = async (req, res = response) => {
    
    const {id} = req.params

    const {estado, ...data} = req.body
    
    const producto = await Producto.findByIdAndUpdate(id, data)

    if(!producto) {
        return res.status(404).json({
            msg: "No se encontro el producto con ese id",
            id
        })
    }
    res.json({producto})
}

const eliminarProducto = async (req, res = response) => {
    
    const {id} = req.params
    
    const producto = await Producto.findByIdAndUpdate(id, {estado: false})

    if(!producto) {
        return res.status(404).json({
            msg: "No se encontro el producto con ese id",
            id
        })
    }
    res.json({producto})
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoById,
    actualizarProducto,
    eliminarProducto
}