const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const {fillUp} = require("./src/handlers/startUpHandler")
const {fillUp2} = require("./src/handlers/startUpHandlerTeams")
conn.sync({ force: true }).then(() => {
  fillUp()
  fillUp2()
  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
