const axios = require('axios');

const getDrivers = async () =>
{
    try
    {
        
        const data = await axios.get("http://localhost:5000/drivers");
        
        return data;
    }
    catch(error)
    {
        console.log("error del getDrivers:",{error_getDrivers: error.message});
    }
}

module.exports = { getDrivers };