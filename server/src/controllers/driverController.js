const axios = require('axios');
const { Driver, Union } = require("../db.js");
const {Op} = require("sequelize") 

console.log("llega a driverController")

const infoCleaner = (arr) => {
    return arr.map((country) => ({
        id: country,
        nombre: name.forename?name.forename:null,
        apellido: name.surname?name.surname:null,
        descripcion: description?description:null,
        imagen: image.url.png?image.url.png:null,
        nacionalidad: nationality?nationality:null,
        fechaNacimiento: dob?dob:null
    }));
  };//editar despues

const getDriverByNombre = async(nombre)=>{
    
    try {
        
        const DriverApi = Driver.findAll({
            where:{
                nombre
            }
        });//el problema esta aca
        
        return DriverApi
    } catch (error) {
        // Handle errors from the API request
        throw new Error(`Failed to fetch Driver data from the API: ${error.message}`);
    }

}
const getAllDrivers = async () => {
    try {
        const DriverFromDB = await Driver.findAll();//this line is the specific problem
        
    return DriverFromDB
} catch (error) {
    console.error('Error retrieving data from the database:', error);
  }
}

const getDriverById = async (id) => {
    try {
        const DriverApi = await Driver.findAll({
            where: {
                id
            }
        });
       
        const DriverId = id;
        const apiUnion = await Union.findAll({
            where: {
                DriverId
            }
        });
        
        const driverApiPlus = DriverApi.concat(apiUnion);

        return driverApiPlus;
    } catch (error) {
        // Handle errors from the API request
        throw new Error(`Failed to fetch Driver data from the API: ${error.message}`);
    }
    
};

module.exports = {getDriverByNombre, getAllDrivers, getDriverById };
