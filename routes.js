const express = require("express");
const route = express.Router();
const selectController = require("./controllers/selectController");

route.use("/produtos",selectController.index);

module.exports = route;