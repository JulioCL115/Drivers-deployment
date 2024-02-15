const { Router } = require('express');

const {  getDriverByNombre, getAllDrivers, getDriverById } = require("../controllers/driverController.js");  
const {  getTeamByNombre, getAllTeams } = require("../controllers/teamController.js");  

const getDriversHandler = async (req, res) => {
    
    const { 
        nombre,
        apellido,
        descripcion,
        imagen,
        nacionalidad,
        fechaNacimiento
    } = req.query;
    
    try {
        if(nombre){
            const driverByNombre = await getDriverByNombre(nombre)
            res.status(200).json(driverByNombre);
        }else{
            const response = await getAllDrivers()
            
            res.status(200).json(response);
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};//listo?1

const getDriverDetailHandler = async (req, res) => {
    const { id } = req.params;

    try {
        
        const response = await getDriverById(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};//listo?2

const getDriversByNameHandler = async (req, res) => {
    const { nombre } = req.params;

    try {
        
        const response = await getDriverByNombre(nombre);
        
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};//listo?3

const getTeamsHandler = async (req, res) => {
    const { name, flagImage, continent, capital, subregion,area, population } = req.query;
    try {
        if(name){
            const CountryeByNombre = await getTeamByNombre(name)
            res.status(200).json(CountryeByNombre);
        }else{
            const response = await getAllTeams()
            
            res.status(200).json(response);
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};//listo?4

module.exports = {
    getDriversHandler,
    getDriverDetailHandler,
    getDriversByNameHandler,
    getTeamsHandler
};
