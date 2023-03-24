const { sequelize } = require("../../connection");
const { ThemeModel } = require("../../model/themes.model");
const ThemesService = require('../../service/themes.service');

//Cuando se trata de listar es mejor usar SQL puro por cuestión de tiempo
const listar = async function (req, res) {
    console.log("listar temas");

    try {

        const themes = await ThemesService.listar(req.query.filtro || '');

        if (themes) {
            res.json({
                succes: true,
                temas: themes[0]
            });
        } else {
            res.json({
                succes: true,
                temas: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message
        });
    }
};

const buscarPorCodigo = async function (req, res) {
    console.log("consultar 1 tema por codigo");

    try {
        const themeModelResult = await ThemesService.consultarPorCodigo(req.params.filtro || '');
        if (themeModelResult) {
            res.json({
                succes: true,
                tema: themeModelResult
            });
        } else {
            res.json({
                succes: true,
                tema: null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message
        });
    }
};

const actualizar = async function (req, res) {
    console.log("actualizar temas");
    let temaRetorno = null; //Guarda el tema que se va a incluir o editar
    //const data = req.body;
    //const id = req.body.id;

    try {
        let temaRetorno = await ThemesService.actualizar(req.body.id,
            req.body.create_date,
            req.body.name,
            req.body.description,
            req.body.keywords,
            req.body.owner_user_id
        );
    res.json({
        success: true,
        user: temaRetorno
    })
} catch (error) {
    console.log(error);
    res.json({
        success: false,
        error: error.message
    });
}

};

const eliminar = async function (req, res) {
    console.log("eliminar temas");
    //res.send("eliminar temas");
    try {
        await ThemesService.eliminar(req.params.filtro || '');
        res.json({
            succes: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message
        });
    }
};

module.exports = {
    listar, buscarPorCodigo, actualizar, eliminar
};