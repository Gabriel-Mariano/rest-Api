const conn = require("../database/connection");

module.exports = {
    async index(req,res){
        await conn.query("SELECT * FROM usuarios",function(error,results,fields){
            if(error){
                return res.status(500).send({
                    message:error
                });
            }
            res.status(200).send(results);
        });
    },
    async create(req,res){
        const user = {
            name: req.body.name,  
            description: req.body.description,
            email: req.body.email,
            password:req.body.password,
            birth: req.body.birth, /* ** Data de nascimento ** */
            genre: req.body.genre,
            city: req.body.city,
            bestTech: req.body.bestTech /* ** Tecnologia Dominante ** */
        }
         

        const sql = `INSERT INTO usuarios (nome, descricao, email, password, nascimento, genero, cidade, stack) 
                     VALUES(?,?,?,?,?,?,?,?)`;
            await conn.query(sql,[user.name, user.description, user.email, user.password, user.birth,user.genre, user.city, user.bestTech ],
                  function(error,results,fields){
                if(error){
                    return res.status(500).send({
                        message:error
                    });
                }
                res.status(200).send({
                    message:"Usuário inserido com sucesso"
                });
            }); 
    },
    async delete(req,res){
        const id  = req.params.id_usuario;
        
        const sql = "DELETE FROM usuarios WHERE id = ?";
        await conn.query(sql,[id],function(error,results,fields){
            if(error){
                return res.status(500).send({
                    message:error
                });
            }
            res.status(200).send({
                message:`Usuário de id:${id} foi excluído com sucesso.`
            });
        });
    }
}