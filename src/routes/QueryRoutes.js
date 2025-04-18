const routes = require('express').Router();

const queryController = require("../controllers/QueryController");

routes.post("/postquery",queryController.postQuery);
routes.get("/getallqueries",queryController.getAllQueries);


module.exports = routes;