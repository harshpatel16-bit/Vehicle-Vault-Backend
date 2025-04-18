const routes = require('express').Router();
const areaController = require('../controllers/AreaController');

routes.post('/addarea', areaController.addArea);
routes.get('/getallareas', areaController.getAreas);
routes.get("/getareabycity/:cityId",areaController.getAreaBycityId);
routes.get("/getareabyid/:id",areaController.getAreaById);
module.exports = routes;