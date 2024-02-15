const { getTeams } = require('../controllers/getAllTeamsController.js');
const { Team, Driver, Union } = require('../db.js');
const { v4: uuidv4 } = require('uuid');
const { getDriverByNombre } = require('../controllers/driverController');



const fillUp2 = async () => {
  try {
    let teamsResponse = await getTeams();
    let teams = teamsResponse.data;

    for (const driver of teams) {
      const teamNames = driver.teams ? driver.teams.split(',') : [];

      for (const teamName of teamNames) {
        const newId = uuidv4();

       const [createdTeam, created] = await Team.findOrCreate({
  where: {
    nombre: teamName.trim(),
    // Otras condiciones de búsqueda si es necesario
  },
  defaults: {
    id: newId,
    nombre: teamName.trim()
    // Otros campos que necesitas configurar en caso de que el equipo no exista
  }
});

        // Usar await para esperar a que la promesa se resuelva
        const driver2Array  = await getDriverByNombre(driver.name.forename);

        if (driver2Array.length > 0) {
  const driver2 = driver2Array[0];
  
  const existingUnion = await Union.findOne({
    where: {
      DriverId: driver2.id,
      TeamId: createdTeam.id,
    }
  });

  if (!existingUnion) {
    // Si no existe, entonces crear la relación
    await Union.create({
      DriverId: driver2.id,
      TeamId: createdTeam.id,
    });

    
  }
} else {
  console.log("No se encontró ningún conductor con el nombre:", driver.name.forename);
}
      }
    }

    console.log("______________Cargado teams correctamente______________");
  } catch (error) {
    console.log("_____________Error al cargar teams fillUp________________");
    console.log(error);
  }
};

module.exports = { fillUp2 };
