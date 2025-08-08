const routes = require("express").Router();
const carController = require("../controllers/CarController");

routes.post("/addcar", carController.addCar);
routes.get("/getallcars", carController.getAllCars);
routes.post("/addcarwithfile", carController.addCarWithFile);
routes.get("/getallcarsbyuserid/:userId", carController.getAllCarsByUserId);
routes.get("/getcarbyid/:id",carController.getCarById);
routes.put("/updatecar/:id",carController.updateCar);
routes.delete("/deletecarbyid/:id",carController.deleteCarById)
module.exports = routes;
