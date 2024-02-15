const { getDrivers } = require('../controllers/getAllDriversController.js');
const { Driver } = require('../db.js');
const { v4: uuidv4 } = require('uuid');


const fillUp = async () =>
{
    try
    {
        let driversResponse = await getDrivers();
        let drivers = driversResponse.data;
        drivers.map( async (driver) =>
        {
            const newId = uuidv4();
            await Driver.create(
                {
                    id: newId,
                    nombre: driver.name.forename?driver.name.forename:null,
                    apellido: driver.name.surname?driver.name.surname:null,
                    descripcion: driver.description?driver.description:null,
                    imagen: driver.image.url?driver.image.url:"https://static.wikia.nocookie.net/minecraft/images/3/3e/MissingTextureBlock.png",
                    nacionalidad: driver.nationality?driver.nationality:null,
                    fechaNacimiento: driver.dob?driver.dob:null
                }//pendiente a editar valores
            );
        });
        console.log("______________Cargado correctamente______________");
    }
    catch(error)
    {
        console.log("_____________Error al cargar fillUp________________")
        console.log(error)
        
    }
}

module.exports = { fillUp };