const express = require("express");
const route = express.Router();
const selectController = require("./controllers/selectController");

route.get("/usuarios",selectController.index);
route.post("/usuarios",selectController.create);

module.exports = route;