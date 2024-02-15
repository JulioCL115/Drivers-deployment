
const { saveAllTeams } = require('../controllers/saveAllTeams');

const getTeamsHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const allTeams = await saveAllTeams(name);
        res.status(200).json(allTeams);
    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getTeamsHandler
}
 saveAllTeams.js:
const axios = require("axios");
const { Team } = require("../db");


const URL = http://localhost:5000/drivers


const saveAllTeams = async () => {
    const allDrivers = (await axios.get(${URL})).data;
    
    const uniqueTeamsSet = new Set();


    allDrivers.forEach(driver => {
        if (driver.teams){
            const driverTeams = driver.teams.split(',').map(team => team.trim());
            driverTeams.forEach(team => uniqueTeamsSet.add(team));
        }
    });
 
    const uniqueTeamsArray = [...uniqueTeamsSet].sort();

    const teamsDB = await Promise.all(
        uniqueTeamsArray.map(async (team) => {
        return await Team.findOrCreate({
            where: { name: team },
            defaults: { name: team },
        });
        })
    );
    return uniqueTeamsArray;
}

module.exports = {
    saveAllTeams,
};