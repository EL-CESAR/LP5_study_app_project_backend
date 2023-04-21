const { sequelize } = require("../connection");
const { UserModel } = require("../model/user.model");

//Bitelyuz

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
    console.log("Consultar 1 usuario por codigo");
    try {
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
        let usuarioRetorno = null;
        const data = {id, name, last_name, avatar, email, password, deleted};
        try {
        let usrExiste = null;
        if (id) {
            usrExiste = await UserModel.findByPk(id);
        }
        if (usrExiste) {
            usuarioRetorno = await UserModel.update(data, { where : {id : id}});
            usuarioRetorno = data;
        } else {
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
    try {
        await sequelize.query("UPDATE users SET deleted=true WHERE id = " + codigo);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {listar, consultarPorCodigo, actualizar, eliminar};