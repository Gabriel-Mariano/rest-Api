const mysql   = require("mysql");
const connect = mysql.createConnection({
    host:process.env.MYSQL_HOST, 
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
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