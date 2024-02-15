const axios = require('axios');
const { Driver, Team } = require("../db");

const createDriverDB = async (nombre, apellido, descripcion, imagen, nacionalidad, fechaNacimiento, team, color)=>{
    console.log("llega a createDriverDB 1:",nombre, apellido, descripcion, imagen, nacionalidad, fechaNacimiento,team, color)
    const newDriver = await Driver.create({nombre, apellido, descripcion, imagen, nacionalidad, fechaNacimiento, color});
    console.log("llega a createDriverDB 2:",newDriver)
    const teamArray = team.includes(',') ? team.split(',').map(item => item.trim()) : [team.trim()];
    console.log(teamArray)
    teamArray.map(async(callId)=>await newDriver.addTeam(callId))//aca esta el problema

    
    console.log("llega a createDriverDB 3")
    return newDriver
}

module.exports = { createDriverDB };
