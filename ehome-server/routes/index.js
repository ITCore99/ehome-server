var express = require('express');
var router = express.Router();
const login=require("../controller/login/index");
const user=require("../controller/user/index");
const category=require("../controller/news/category")
const news=require("../controller/news/news");
const swiper=require("../controller/swiper/index");
const topic=require("../controller/topic/index");
const comment=require("../controller/comment/index")

router.use("/",login);
router.use("/user",user);
router.use("/category",category);
router.use("/news",news);
router.use("/swiper",swiper);
router.use("/topic",topic);
router.use("/comment",comment)
module.exports = router;
