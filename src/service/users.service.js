const { sequelize } = require("../connection");
const { UserModel } = require("../model/user.model");


const listar = async function (textoBuscar) {
    console.log("listar usuarios service");


    try {
        

        const users = await sequelize.query(`SELECT *
                                             FROM users
                                             WHERE 1 = 1
                                             AND UPPER(name) LIKE UPPER('%${textoBuscar}%')
                                             AND deleted IS false
                                             ORDER BY id`);

        if (users && users[0]) {
            //En users[0] se encuentra el listado de lo que se recupeara desde el SQL
                return users[0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};





const consultarPorCodigo = async function (codigo) {

    console.log("Consultar usuarios por codigo");

    try {
        //const users = await sequelize.query("SELECT * FROM users " + "WHERE id = " + req.param.id + " deleted IS false");


        //const users = await sequelize.query(`SELECT * FROM users WHERE 1=1 AND id = ${req.params.id} AND deleted IS false`);

        const userModelResult = await UserModel.findByPk(codigo);

        if (userModelResult) {
            return userModelResult;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};









const actualizar = async function (id, name, last_name, avatar, email, password, deleted) {
    console.log("actualizar usuarios");
    //Variables
  
        let usuarioRetorno = null;  //Guardará el usuario que se va a incluir o editar
        const data = {id, name, last_name, avatar, email, password, deleted};      //Se obtiene los datos del cuerpo de la petición
        

        try {
        let usrExiste = null;
        if (id) {
            usrExiste = await UserModel.findByPk(id);
        }
        if (usrExiste) {
            //Asegurar que el usuario existe, entonces actualizar
            usuarioRetorno = await UserModel.update(data, { where : {id : id}});
            usuarioRetorno = data;
        } else {
            //Incluir
            usuarioRetorno = await UserModel.create(data);
        }
        return usuarioRetorno;
    } catch (error) {
       console.log(error);
       throw error;
    }

};




const eliminar = async function (req, res) {

    console.log("eliminar usuarios");
    //res.send("eliminar de usuarios");
    try {

        //userModel.destroy(req.params.id);     En caso de querer hacer el borrado físico del registro dentro de la base de datos

        await sequelize.query("UPDATE users SET deleted=true WHERE id = " + codigo);
        //await sequelize.query("UPDATE users SET deleted=true WHERE id = " + req.params.id);

    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar};



/*module.exports = function(req, res){

    console.log("controller de usuarios");
    res.send("listado de usuarios");
};*/