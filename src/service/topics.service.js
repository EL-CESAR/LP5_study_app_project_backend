const { sequelize } = require("../connection");
const { TopicModel } = require("../model/topics.model");

//En el apartado de listar es mejor usar SQL puro por cuestión de tiempo
const listar = async function (textoBuscar) {
    console.log("Listar topicos");


    try {
        

        const themes = await sequelize.query(`SELECT *
                                             FROM topics
                                             WHERE 1 = 1
                                             AND UPPER(name) LIKE UPPER('%${textoBuscar}%') 
                                             ORDER BY id`);

        if (topics && topics[0]) {
           
                return topics[0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};





const consultarPorCodigo = async function (codigo) {

    console.log("Consultar 1 topico por codigo");

    try {
        //const users = await sequelize.query("SELECT * FROM users " + "WHERE id = " + req.param.id + " deleted IS false");


        //const users = await sequelize.query(`SELECT * FROM users WHERE 1=1 AND id = ${req.params.id} AND deleted IS false`);

        const topicsModelResult = await TopicModel.findByPk(codigo);

        if (topicsModelResult) {
            return topicsModelResult;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};









const actualizar = async function (id, create_date, name, topic_id, order, priority, color, owner_user_id) {
    console.log("actualizar topicos");
    //res.send("actualizar de topicos");
    //Variables
  
        let topicoRetorno = null;  //Guardará el tema que se va a incluir o editar
        const data = {id, create_date, name, topic_id, order, priority, color, owner_user_id}; //Se obtiene los datos del cuerpo de la petición
        

        try {
        let topicoExiste = null;
        if (id) {
            topicoExiste = await TopicModel.findByPk(id);
        }
        if (topicoExiste) {
            //Asegurar que el topico existe, entonces actualizar
            topicoRetorno = await TopicModel.update(data, { where : {id : id}});
            topicoRetorno = data;
        } else {
            //Incluir
            topicoRetorno = await TopicModel.create(data);
        }
        return topicoRetorno;
    } catch (error) {
       console.log(error);
       throw error;
    }

};




const eliminar = async function (codigo) {

    console.log("eliminar topicos");
  
    try {
        TopicModel.destroy({ where: { id: codigo, topic_id: codigo }}, { truncate: false });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { listar, consultarPorCodigo, actualizar, eliminar};

