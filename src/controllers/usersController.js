const conn = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {
    // Método para listar usuários do banco de dados
    async index(req,res){
        // Construção da lógica para páginação
        var {page} = req.query; // --> http://localhost:3080/usuarios?page=1 --> page = 1;
        
        if(page === undefined){
            page = 1;
        }

        const limit  = 10;
        const count  = (page-1)*limit;
        
        /* 
           **  MySQL 
            - A cláusula LIMIT é utilizada para limitar o número de resultados de uma Query. 
            - O comando OFFSET indica o início da leitura, e o LIMIT o máximo de registros a serem lidos. 
           ** 
        */

        await conn.query(`SELECT * FROM usuarios LIMIT 10 OFFSET ${count}`,function(error,results,fields){
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

        
        await conn.query(`SELECT * FROM usuarios WHERE email = ?`,[user.email],function(error,results, fields){
            if(error){
                return res.status(500).send({ message: error });
            }
            if(results.length >0 ){
                return res.status(409).send({ message:'email já cadastrado'});
            }

            // Biblioteca que cria um hash de senha
                bcrypt.hash(user.password,10,function(errBcrypt,hash){
                    if(errBcrypt){
                        return res.status(500).send({ error:errBcrypt});
                    }
                
            
        
            const sql = `INSERT INTO usuarios (nome, descricao, email, password, nascimento, genero, cidade, stack) 
                        VALUES(?,?,?,?,?,?,?,?)`;
                 conn.query(sql,[user.name, user.description, user.email, hash, user.birth,user.genre, user.city, user.bestTech ],
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
            });  
        });
    },
    // Método para atualizar dados do usuário no bando de dados
    async update(req,res){
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
    },
    // Método de Login de usuário
    async login(req,res){
        const user = {
            email:req.body.email,
            password:req.body.password
        }

        const sql = "SELECT * FROM usuarios WHERE email = ? ";

    await conn.query(sql,[user.email],function(error,results,fields){
            if(error){
                return res.status(500).send({ message: error });
            }
            if(results.length <1){
                return res.status(401).send({ message: 'Falha na autenticação '});
            }


            bcrypt.compare(user.password,results[0].password,(err,result)=>{
                if(err){
                    return res.status(401).send({ message: err});
                }
                if(result){
                    const token = jwt.sign({
                        id:results[0].id,
                        name:results[0].nome
                    },process.env.JWT_KEY, { expiresIn:60*60 });
                    res.status(200).json({
                        user:results[0].nome,
                        token:token
                    });
                }else{
                    res.status(401).send({ message: 'Falha na autenticação '});
                }
  
            });
        });
    }
}