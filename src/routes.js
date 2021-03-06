const express = require("express");
const route = express.Router();
const usersController = require("./controllers/usersController");
const middlewareDelete = require("./middleware/login");

route.get("/usuarios",usersController.index);
route.post("/usuarios",usersController.create);
route.patch("/usuarios",usersController.update);
route.delete("/usuarios/:id_usuario", middlewareDelete,usersController.delete);

route.post("/login",usersController.login);

module.exports = route;