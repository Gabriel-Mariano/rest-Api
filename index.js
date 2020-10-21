const express = require("express");
const app  = express();
const port = 3080;
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use(cors());
app.use(routes);

app.listen(port,()=>{
    console.log(`Serviço rodando na porta ${port}`);
})