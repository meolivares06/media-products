const jsonServer = require("json-server");
const db = require("../../public/db.json");


const server = jsonServer.create();
const router = jsonServer.router(db);
const middleWares = jsonServer.defaults();

server.use(middleWares);
server.use(router);

server.listen(4200, () => {
    console.log("Server is runnig on port: ", 4200);

})