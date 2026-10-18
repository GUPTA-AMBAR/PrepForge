const {Router} = require('express');
const {registerUserController, 
    loginUserController,
    logoutUserController,
    getMeController
} = require('../controllers/auth.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);

// clearup the token and perform token blacklisting
router.get("/logout",authMiddleware,logoutUserController);

// get me details
router.get("/get-me", authMiddleware, getMeController);
module.exports = router; 