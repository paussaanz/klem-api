const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Users
router.get("/users/me", authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get( "/users", usersController.getUsers);
router.get("/users/:id", authMiddleware.isAuthenticated, usersController.getUser);
router.post("/register",  usersController.createUser); //upload.single("imageUrl"),
router.post("/edit/:id", usersController.updateUser);
router.post("/editProfilePic/:id",  usersController.updateProfilePic); //upload.single("imageUrl"),


module.exports = router;