const { Router } = require("express");
const {
    getDriversHandler,
    getDriverDetailHandler,
    getDriversByNameHandler,
    getTeamsHandler//no se si ponerlo aca o en la otra ruta
  } = require("../handlers/driversHandler");
  console.log("llega a index")
  const {
    createDriverHandler
    //getTeamsHandler
      } = require("../handlers/createDriverHandler.js");
  
const { router } = require('json-server');
const routes = Router();

routes.get("/drivers", getDriversHandler);//anda
routes.get("/drivers/:id", getDriverDetailHandler);//anda
routes.get("/drivers/name/:nombre", getDriversByNameHandler);//anda
routes.post("/drivers", createDriverHandler);//anda
routes.get("/teams", getTeamsHandler);//


module.exports = routes;
