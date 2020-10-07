const conn = require("../database/connection");

module.exports = {
    async index(req,res){
        await conn.query("SELECT * FROM produtos",function(error,results,fields){
            if(error){
                return res.status(500).send({
                    message:error
                });
            }
            res.status(200).send(results);
        });
    }
}