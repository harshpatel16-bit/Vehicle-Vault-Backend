const routes = require("express").Router()
const { Router } = require("express")
const roleController = require("../controllers/RoleController")
routes.get("/roles",roleController.getAllroles)
routes.post("/role",roleController.addRole)
routes.delete("/role/:id",roleController.deleteRole)
routes.get("/role/:id",roleController.getRoleById)

module.exports = routes 
