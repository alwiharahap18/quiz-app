const express = require("express");
const { refreshToken } = require("../Controllers/refreshToken");

// controllers
const { Register, Login, Logout, getIG } = require("../Controllers/User");
 
const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.get('/show/:getId', getIG);
router.delete('/logout', Logout);
 
module.exports = router;