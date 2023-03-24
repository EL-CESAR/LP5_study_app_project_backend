const { sequelize } = require("../../connection");
const { TopicModel } = require("../../model/topics.model");

const listar = async function (req, res) {
    console.log("listar topicos");
    try {
        const topics = await sequelize.query("SELECT * FROM topics");
        console.log("topics", topics);
        if (topics && topics[0]) {
            res.json({
                succes: true,
                topicos: topics[0]
            });
        } else {
            res.json({
                succes: true,
                topicos: []
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
    console.log("consultar 1 topico por codigo");

    try {
        const topicModelResult = await TopicModel.findByPk(req.params.id);
        if (topicModelResult) {
            res.json({
                succes: true,
                topic: topicModelResult
            });
        } else {
            res.json({
                succes: true,
                topico: null
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
    console.log("actualizar topico");
    let topicoRetorno = null;
    const data = req.body;
    const id = req.body.id;

    try {
        let topicModelResult = null;
        if (id) {
            topicModelResult = await TopicModel.findByPk(id);
        }
        if (topicModelResult) {
            topicoRetorno = await TopicModel.update(data, { where: { id: id } });
            topicoRetorno = data;
        } else {
            topicoRetorno = await TopicModel.create(data);
        }
        res.json({
            succes: true,
            topico: topicoRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message
        });
    }
};

const eliminar = async function (req, res) {
    console.log("eliminar topico");

    try {
        //TopicModel.destroy(req.params.id);
        const topics = await sequelize.query("DELETE FROM topics WHERE topic_id = " + req.params.id);
        console.log("topico eliminado");
        res.json({
            succes: true,
            topico: null
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