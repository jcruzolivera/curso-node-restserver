const { response } = require('express');

const usersGet = (req, res = response) => {

    const {hola = 'nn', edad = 0} = req.query;

    res.json({
        msg:'get api cc',
        hola,
        edad
    });
}

const usersPost = (req, res) => {

    const {nombre, edad} = req.body;

    res.status(201).json({
        msg:'post api',
        nombre,
        edad
    });
}

const usersPut = (req, res) => {

    const {id} = req.params;

    res.json({
        msg:'put api',
        id
    });
}

const usersDelete =  (req, res) => {
    res.json({
        msg:'del api'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut, 
    usersDelete
}