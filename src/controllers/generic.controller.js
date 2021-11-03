const oracledb = require('oracledb');
const config = require('../config')

const oracleConfig = config.oracle;

let genericController = {};

genericController.getGeneric = async (req, res, next) => {
    try {
        res.status(200).send('Get Generico');
    } catch (error) {
        console.error(error);
        res.sendStatus(404);
    }
}

genericController.getDbGeneric = async (req, res, next) => {
    try {
        const query = "Select ..."; //TODO select

        const connection = await oracledb.getConnection(oracleConfig);
        const result = await connection.execute(query, {}, {
            outFormat: oracledb.OBJECT
        });

        res.contentType('application/json').status(200);
        res.send(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).send({
            "status": false,
            "message": "Validar"
        });
    }
}

module.exports = genericController