const { Router } = require('express');
//falta crear los controlers:
const { createDriverDB } = require("../controllers/createDriverControler.js");

const createDriverHandler = async (req, res) => {
    try {
        console.log("----------llega-----------")
        console.log("----------"+req.query.nombre+"-----------")
        console.log("req.query:",req.query)
        const { nombre, apellido, descripcion, imagen, nacionalidad, fechaNacimiento, team, color} = req.query;
        console.log("----------llega:"+ nombre+"-----------")
        const response = await createDriverDB( nombre, apellido, descripcion, imagen, nacionalidad, fechaNacimiento,team, color);// el problema es aca
        console.log("response:",response)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//listo?

module.exports = {
    createDriverHandler
};
/*{
    "nombre":"a",
    "dificultad":"4",
    "duración":"40",
    "temporada":"Verano"
    }*/