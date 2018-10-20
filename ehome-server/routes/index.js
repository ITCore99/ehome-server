var express = require('express');
var router = express.Router();
const login=require("../controller/login/index");
const user=require("../controller/user/index");



router.use("/",login);
router.use("/user",user);
module.exports = router;
