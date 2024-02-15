const axios = require('axios');
const { Driver , Team } = require("../db.js");
const {Op} = require("sequelize") 

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

const getTeamByNombre = async(nombre)=>{
    
    try {
        
        const TeamApi = Team.findAll({
            where:{
                nombre
            }
        });//el problema esta aca
        
        return TeamApi
    } catch (error) {
        // Handle errors from the API request
        throw new Error(`Failed to fetch Driver data from the API: ${error.message}`);
    }

}
const getAllTeams = async () => {
    try {
        const TeamFromDB = await Team.findAll();//this line is the specific problem
    return TeamFromDB
} catch (error) {
    console.error('Error retrieving data from the database:', error);
  }
}



module.exports = {getTeamByNombre, getAllTeams };
