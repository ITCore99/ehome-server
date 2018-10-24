const {Router}= require("express");
const router=Router();
const jwt=require("jsonwebtoken");
const tokenConfig=require("../../config/tokenConfig");
let user=require("../../database/model/user");


router.post("/login",(req,res,next)=>{

    let {idCardNumber,pwd}  =req.body;
    user.findOne({idCardNumber}).then(data=>{
        if(data===null)
        {
            res.json({
                msg:"用户不存在",
                code:401,
            });
            return;
        }
        if(data.pwd==pwd)
        {
            let useInfo={
                id:data.id,
                name:data.userName,
                idCardNumber:data.idCardNumber,
            };
            let token=jwt.sign(useInfo,tokenConfig.secert,{expiresIn:tokenConfig.exp()});
            req.session.userInfo=data;
            res.json({
                code:200,
                msg:"登陆成功",
                token,
                data,
            });
        }else
        {
            res.json({
                code:400,
                msg:"密码错误"
            })
        }
    })
});
module.exports=router;