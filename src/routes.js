const express = require("express");
const route = express.Router();
const usersController = require("./controllers/usersController");

route.get("/usuarios",usersController.index);
route.post("/usuarios",usersController.create);
route.delete("/usuarios/:id_usuario",usersController.delete);

module.exports = route;