const routes = require('express').Router();
const cityController = require('../controllers/CityController');
routes.post("/addcity", cityController.addCity);    
routes.get("/getallcities", cityController.getCities);
routes.get("/getcitybystate/:stateId",cityController.getCityByStateId);
routes.get("/getcitybyid/:id",cityController.getCityById);

module.exports = routes;