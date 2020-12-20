const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/login", controller.login);
//*                                                      http://localhost:5000/api/auth/login
router.post("/register", controller.register);
//*                                                      http://localhost:5000/api/auth/register

module.exports = router;
