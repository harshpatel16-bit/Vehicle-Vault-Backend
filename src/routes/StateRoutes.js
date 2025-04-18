const routes = require('express').Router();
const stateController = require('../controllers/StateController');
routes.post("/addstate", stateController.addState);
routes.get("/getallstates", stateController.getAllStates);
routes.get("/getstatebyid/:id",stateController.getStateById);
module.exports = routes;