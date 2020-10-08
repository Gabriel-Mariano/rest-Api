const conn = require("../database/connection");

module.exports = {
    // Método para listar usuários do banco de dados
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
    // Método para inserir um usuário no bando de dados
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
    async update(req,res){
        // Método para atualizar dados do usuário no bando de dados
        const user = {
            description: req.body.description,
            genre: req.body.genre,
            city: req.body.city,
            bestTech: req.body.bestTech, 
            id:req.body.id
        }

        await conn.query('SELECT * FROM usuarios WHERE id = ?',[user.id],function(error,results,fields){
            if(error){
                return res.status(500).send({ mensage:error });
            }
            if(results.length <1){
                return res.status(401).send({ mensage:'Id não existe' });
            }

        const sql = `UPDATE usuarios 
                     SET  descricao = ?,
                            genero  = ?,
                            cidade  = ?,
                            stack   = ?
                        WHERE  id = ?`;
            
            conn.query(sql,[user.description,user.genre,user.city,user.bestTech,user.id], function(error,results,fields){
                if(error){
                    return res.status(500).send({
                        message:error
                    });
                }
                res.status(200).send({
                    message:`O cadastro foi atualizado.`
                });
            });
        });
    },
    // Método para deleter um usuário do banco de dados 
    async delete(req,res){
        const id  = req.params.id_usuario;
        
        const sql = "DELETE FROM usuarios WHERE id = ?";
        await conn.query(sql,[id],function(error,results,fields){
            if(error){
                return res.status(500).send({
                    message:error
                });
            }
            res.status(202).send({
                message:`Usuário de id:${id} foi excluído com sucesso.`
            });
        });
    }
}