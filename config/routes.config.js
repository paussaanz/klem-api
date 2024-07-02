const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("./storage.config");

// Users
router.get("/users/me", authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get( "/users", usersController.getUsers);
router.get("/users/:id", authMiddleware.isAuthenticated, usersController.getUser);
router.post("/register", upload.single("imageUrl"), usersController.createUser);
router.post("/edit/:id", usersController.updateUser);
router.post("/editProfilePic/:id", upload.single("imageUrl"), usersController.updateProfilePic); 

//Auth
router.post("/login", authController.doLogin);

//Posts
router.post("/create-post", postController.createPost)

module.exports = router;