const mysql   = require("mysql");
const connect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'rest'
});

// Use ' .connect ' para conectar ao banco de dados.
connect.connect((err)=>{
    if(err){
        console.log(err.code);
        return connect.end(); // Use ' .end ' para fechar a conexão 
    }
    console.log(`Conectado ao banco.`)
});

module.exports = connect;