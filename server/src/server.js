const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");


const server = express();
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // actualiza para que coincida con el dominio desde el cual realizarás la solicitud, en el segundo campo va la web de la que se realiza la solicitud
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
server.use(express.json());
//bazinga funciona  
server.use(cors());
server.use(router);
module.exports = server;
