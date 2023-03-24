const { sequelize } = require("../../connection");


const listar = async function (req, res) {


    try {
        console.log("listar usuarios");

        const users = await sequelize.query("SELECT * FROM users");

        if (users && users[0]) {
            //En users[0] se encuentra el listado de lo que se recupeara desde el SQL
            res.json({
                success: true,
                usuarios: users[0]
            });
        } else {
            res.json({
                success: true,
                usuarios: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.mesaje
        });
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("Consultar usuarios por codigo");

    try {
        //const users = await sequelize.query("SELECT * FROM users " + "WHERE id = " + req.param.id + " deleted IS false");


        const users = await sequelize.query(`SELECT * FROM users WHERE 1=1 AND id = ${req.params.id} AND deleted IS false`);


        if (users && users[0] && users[0][0]) {
            //En users[0] se encuentra el listado de lo que se recupeara desde el SQL
            res.json({
                success: true,
                usuarios: users[0][0]
            });
        } else {
            res.json({
                success: true,
                usuarios: null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.mesaje
        });
    }
};

const actualizar = async function (req, res) {
    console.log("actualizar usuarios");
    //Variables
    try {
        let usuarioRetorno = null;  //Guardará el usuario que se va a incluir o editar
        const data = req.body;      //Se obtiene los datos del cuerpo de la petición
        const id = req.body.id;

        let usrExiste = null;
        if (id) {
            usrExiste = await sequelize.query("SELECT * FROM users WHERE id = " + id);  //Buscar usuario por id pasado
        }
        if (usrExiste && usrExiste[0] && usrExiste[0][0] && usrExiste[0][0].id) {
            //Asegurar que el usuario existe, entonces actualizar
            const retornoUpdate = await sequelize.query(`UPDATE users SET 
                                                name = '${data.name}', 
                                                last_name= '${data.last_name}', 
                                                avatar = '${data.avatar}', 
                                                email ='${data.email}', 
                                                password = '${data.password}', 
                                                deleted = ${data.deleted} 
                                        WHERE id = ${data.id}`);
            usuarioRetorno = await sequelize.query("SELECT * FROM users WHERE id = " + usrExiste[0][0].id);
            usuarioRetorno = usuarioRetorno[0][0];
        } else {
            const retornoInsert = await sequelize.query(`INSERT INTO users (name, last_name, avatar, email, password, deleted) VALUES (
                            '${data.name}', '${data.last_name}', '${data.avatar}', '${data.email}', '${data.password}', false) 
                            RETURNING id;`);

            usuarioRetorno = await sequelize.query("SELECT * FROM users WHERE id = " + retornoInsert[0][0].id);
            usuarioRetorno = usuarioRetorno[0][0];
        }
        res.json({
            success: true,
            user: usuarioRetorno
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.mesaje
        })
    }

}

const eliminar = async function (req, res) {

    console.log("eliminar usuarios");
    //res.send("eliminar de usuarios");
    try {
        await sequelize.query("UPDATE users SET deleted=true WHERE id = " + req.params.id);
        res.json({
            success: true
        });

    } catch (error) {

        res.json({
            success: false,
            error: error.message
        });


    }
}

module.exports = { listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar };


/*module.exports = function(req, res){

    console.log("controller de usuarios");
    res.send("listado de usuarios");
};*/