const { response } = require('express')
const { Usuario, Producto, Categoria, Role } = require('../models')
const { ObjectId } = require('mongoose').Types

const colleciones_permitidas = [
    'usuarios',
    'roles',
    'productos',
    'categorias'
]

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino)

    if(esMongoID) {
        const usuarios =  await Usuario.findById(termino)
        res.json({
            results: (usuarios) ? [usuarios] : [] 
        })
    }

    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{nombre:regex}, {correo: regex}],
        $and: [{estado: true}]
    })

    res.json({
            results: usuarios 
        })
}

const buscarProdutos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino)

    if(esMongoID) {
        const productos =  await Producto.findById(termino)
        res.json({
            results: (productos) ? [productos] : [] 
        })
    }

    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find({
        $and: [{nombre:regex}, {estado: true}]
    })

    res.json({
            results: productos 
        })
}


const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino)

    if(esMongoID) {
        const categorias =  await Categoria.findById(termino)
        res.json({
            results: (categorias) ? [categorias] : [] 
        })
    }

    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({
        $and: [{nombre:regex}, {estado: true}],
    })

    res.json({
            results: categorias 
        })
}

const buscarRoles = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino)

    if(esMongoID) {
        const roles =  await Role.findById(termino)
        res.json({
            results: (roles) ? [roles] : [] 
        })
    }

    const regex = new RegExp(termino, 'i')

    const roles = await Role.find({
        $and: [{rol:regex}],
    })

    res.json({
            results: roles 
        })
}



const buscar = (req, res = response) => {
    const {coleccion, termino} = req.params

    if(!colleciones_permitidas.includes(coleccion)){
        return res.status(400).json({
            msg: "Las coleccion no esta permitida",
            colleciones_permitidas
        })
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res)
            break
        case 'productos':
            buscarProdutos(termino, res)
            break
        case 'categorias':
            buscarCategorias(termino, res)
            break
        case 'roles':
            buscarRoles(termino, res)
            break
        default:
            res.status(500).json({msg: "Esta busqueda se olvido de hacerla"})
    }
}



module.exports = {
    buscar
}