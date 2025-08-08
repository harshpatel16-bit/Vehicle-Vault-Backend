const routes = require("express").Router()

const userController = require("../controllers/UserController")
routes.get("/users",userController.getAllUsers)
routes.post("/user",userController.signup)
routes.get("/user/:id",userController.getUserById)
routes.delete("/user/:id",userController.deleteUserById)
routes.post("/user/login",userController.loginUser)  
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetpassword)
routes.put("/wishlist/:userId",userController.addToWishlist)
routes.delete("/removewishlist/:userId/:carId",userController.removeCarFromWishlist)


module.exports = routes