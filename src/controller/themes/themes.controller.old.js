const { sequelize } = require("../../connection");
const listar = async function(req, res){
    console.log("Listado de temas");
    try {
        const themes= await sequelize.query('SELECT * FROM themes');
        if(themes && themes[0]){
            //
            res.json({
                success: true,
                temas: themes[0]
            });
        }else{
            res.json({
                seccess: true,
                temas: []
    
            });
        }
    } catch (error) {
        res.json({
            success:false,
            message: error.message
        });
    }

};

const actualizar = async function(req, res){
    console.log("Actualizar temas");
    let themesRetorno=null; //GUARDARA EL USARIO QUE SE VA A INCLUIR O EDITAR
    const data =req.body; // SE OBTIENE LOS DATOS DEL CUERPO DE LA PETICION
    const id=req.body.id; // ID PASADO

    let usrExiste=null;
    try {
        if(id){
            usrExiste= await sequelize.query("SELECT * FROM themes WHERE id="+ id);
        }
        if (usrExiste && usrExiste[0] && usrExiste[0][0] && usrExiste[0][0].id) {
            const retornoupdate = await sequelize.query( `UPDATE themes SET
                                                    create_date = '${data.create_date}' ,
                                                    name = '${data.name}' ,
                                                    description = '${data.description}',
                                                    keywords= '${data.keywors}',
                                                    avatar = '${data.avatar}',
                                                    owner_user_id=${data.owner_user_id}
                                                    WHERE id = '${id}' `) ;
            themesRetorno = await sequelize.query("SELECT * FROM themes WHERE id = "+ usrExiste[0][0].id);
            themesRetorno =themesRetorno[0][0];
        }else{
            const retornoInsert= await sequelize.query( `INSERT INTO themes (create_date, name, keywords,description, avatar, owner_user_id) VALUES
            ('${data.create_date}','${data.name}', '${data.keywords}' ,'${data.description}','${data.avatar}','${data.owner_user_id}') RETURNING id; `) ;
            themesRetorno = await sequelize.query("SELECT * FROM themes WHERE id = "+ retornoInsert[0][0].id);
            themesRetorno =themesRetorno[0][0];
        }
        res.json({
            success:true,
            themes: themesRetorno
        })
    } catch (error) {
        console.log("error");
        res.json({
            success:false,
            message: error.message
        });
    }
};

const eliminar = async function(req, res){
    console.log("eliminar temas");
    try {
        await sequelize.query("DELETE FROM themes WHERE id= " + req.params.id);
        res.json({
            success: true
        }); 
    } catch (error) {
        res.json({
            success:false,
            message: error.message
        }); 
    }
};
module.exports= {
    listar ,
    actualizar,
    eliminar
};
