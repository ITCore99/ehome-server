const {Router}= require("express");
const router=Router();
const user=require("../../database/model/user");
const tokenConfig=require("../../config/tokenConfig");
const jwt=require("jsonwebtoken");



router.post("/add",(req,res,next)=>{

    let {idCardNumber,pwd,userName}=req.body;
    if(idCardNumber&&pwd,userName)
    {
        user.findOne({idCardNumber}).then(data=>{
            if(data!=null)
            {
                res.json({
                    code:400,
                    msg:"此用户已经存过"
                });
                return;
            }else
            {
                user.create({idCardNumber,pwd,userName}).then(data=>{
                   res.json({
                       code:"200",
                       msg:"添加成功"
                   });
                });
            }
        })
    }else
    {
        res.json({
            code:400,
            msg:"请输入必要的参数"
        });
    }
});
router.post("/userInfo",(req,res,next)=>{
    let {token,idCardNumber}=req.body;
    jwt.verify(token,tokenConfig.secert,(err,decoded)=>{
        if(err)
        {
            res.json({
                code:400,
                msg:"用户登录已经失效"
            });
            return;
        }
        user.findOne({idCardNumber}).then(data=>{
            if(data===null)
            {
                res.json({
                    code:400,
                    msg:"没有此用户"
                })
            }else
            {
                res.json({
                    code:200,
                    msg:"获取信息成功",
                    data,
                })
            }
        })
    })
});
router.post("/updatePwd",(req,res,next)=>{
    let {idCardNumber,pwd,newPwd}=req.body;
    if(idCardNumber&&pwd&&newPwd)
    {
        user.findOne({idCardNumber}).then(data=>{
            if(data.pwd==pwd)
            {
                user.update({idCardNumber},{$set:{pwd:newPwd}}).then(data=>{
                    res.json({
                        code:200,
                        msg:"修改密码成功",
                        data:data,
                    }).catch(err=>{
                        res.json({
                            code:400,
                            msg:"修改失败",
                            err,
                        });
                    })
            })
            }else
            {
                res.json({
                    code:400,
                    msg:"旧密码错误"
                })
            }
        })
    }
});
module.exports=router