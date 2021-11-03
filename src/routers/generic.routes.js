const config = require('../config')
const genericController = require('../controllers/generic.controller')

module.exports = (app) => {
    app.route(`/generic`)
        .get(genericController.getGeneric)

    app.route(`/generic/query`)
        .get(genericController.getDbGeneric)
}