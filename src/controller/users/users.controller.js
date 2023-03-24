const { sequelize } = require("../../connection");
const { UserModel } = require("../../model/user.model");
const usersService = require("../../service/users.service");
const UserService = require("../../service/users.service");

const listar = async function (req, res) {
//async para que trabaje de manera asincrona
console.log("listar usuarios controller");

    try {
        

        const users = await UserService.listar(req.query.filtro || '');

        if (users && users[0]) {
            //En users[0] se encuentra el listado de lo que se recupeara desde el SQL
            res.json({
                success: true,
                usuarios: users
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
    console.log("Consultar 1 usuario por codigo");

    try {
        //const users = await sequelize.query("SELECT * FROM users " + "WHERE id = " + req.param.id + " deleted IS false");


        //const users = await sequelize.query(`SELECT * FROM users WHERE 1=1 AND id = ${req.params.id} AND deleted IS false`);

        const userModelResult = await UserService.busquedaPorCodigo(req.params.filtro || '');

        if (userModelResult) {
            res.json({
                success: true,
                usuario: userModelResult
            });
        } else {
            res.json({
                success: true,
                usuario: []
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
  
        let usuarioRetorno = null;  //Guardará el usuario que se va a incluir o editar
        //const data = req.body;      //Se obtiene los datos del cuerpo de la petición
        //const id = req.body.id;

        try {
            usuarioRetorno = await UserService.actualizar(req.body.id,
                req.body.name,
                req.body.last_name,
                req.body.avatar,
                req.body.email,
                req.body.password,
                req.body.deleted);
        res.json({
            success: true,
            user: usuarioRetorno
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }

};




const eliminar = async function (req, res) {

    console.log("eliminar usuarios");
  
    try {
        await usersService.eliminar(req.params.filtro || '');
        res.json({
            success: true
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

module.exports = { listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar };
