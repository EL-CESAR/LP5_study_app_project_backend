const { sequelize } = require("../connection");
const { ThemeModel } = require("../model/themes.model");

//En el apartado de listar es mejor usar SQL puro por cuestión de tiempo
const listar = async function (textoBuscar) {
    console.log("Listar temas");


    try {
        

        const themes = await sequelize.query(`SELECT *
                                             FROM themes
                                             WHERE 1 = 1
                                             AND UPPER(name) LIKE UPPER('%${textoBuscar}%') 
                                             ORDER BY id`);

        if (themes && themes[0]) {
            
                return themes[0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};





const consultarPorCodigo = async function (codigo) {

    console.log("Consultar 1 tema por codigo");

    try {
        //const users = await sequelize.query("SELECT * FROM users " + "WHERE id = " + req.param.id + " deleted IS false");


        //const users = await sequelize.query(`SELECT * FROM users WHERE 1=1 AND id = ${req.params.id} AND deleted IS false`);

        const themesModelResult = await ThemeModel.findByPk(codigo);

        if (themesModelResult) {
            return themesModelResult;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};









const actualizar = async function (id, create_date, name, description, keywords, owner_user_id) {
    console.log("actualizar temas");
    //Variables
  
        let usuarioRetorno = null;  //Guardará el tema que se va a incluir o editar
        const data = {id, create_date, name, description, keywords, owner_user_id}; //Se obtiene los datos del cuerpo de la petición
        

        try {
        let temaExiste = null;
        if (id) {
            temaExiste = await ThemeModel.findByPk(id);
        }
        if (temaExiste) {
            //Asegurar que el tema existe, entonces actualizar
            temaRetorno = await ThemeModel.update(data, { where : {id : id}});
            temaRetorno = data;
        } else {
            //Incluir
            temaRetorno = await ThemeModel.create(data);
        }
        return temaRetorno;
    } catch (error) {
       console.log(error);
       throw error;
    }

};




const eliminar = async function (req, res) {

    console.log("eliminar temas");
   
    try {
        ThemeModel.destroy({ where: { id: codigo }}, { truncate: false });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { listar, consultarPorCodigo, actualizar, eliminar};
