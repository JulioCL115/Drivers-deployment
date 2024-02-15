const axios = require('axios');

const getTeams = async () =>
{
    try
    {
        
        const data = await axios.get("http://localhost:5000/drivers");
        
        return data;
    }
    catch(error)
    {
        console.log("error del getTeams:",{error_getTeams: error.message});
    }
}

module.exports = { getTeams };