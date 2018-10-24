const {Router}= require("express");
const router=Router();
const user=require("../../database/model/user");
const tokenConfig=require("../../config/tokenConfig");
const jwt=require("jsonwebtoken");
const validate=require("../../config/validate")


router.post("/add",(req,res,next)=>{

    let {idCardNumber,userName,homeAddress,nation,qqNumber,weChat,avatar}=req.body;
    if(!req.session&&req.session.userInfo)
    {
       res.json({
           code:400,
           msg:"登陆过期"
       })
        return;
    }
    if(idCardNumber&&userName&&homeAddress&&nation&&qqNumber&&weChat&&avatar)
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
                user.create({idCardNumber,userName,homeAddress,nation,qqNumber,weChat,avatar}).then(data=>{
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
    let {idCardNumber}=req.body;
    let token=req.headers.token;
    jwt.verify(token,tokenConfig.secert,(err,decoded)=>{
        if(err)
        {
            res.json({
                code:400,
                msg:"用户登录已经失效"
            });
            return;
        }
        user.find().sort({_id:-1}).select("-pwd").then(data=>{
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
        user.find({idCardNumber}).then(data=>{
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
router.get("/select/:id",async(req,res,next)=>{
    try
    {
        let {id}=req.params;
        console.log(id);
        let data=await user.findOne({_id:id});

        res.json({
            code:200,
            msg:"查询成功",
            data,
        })

    }catch (err)
    {
        next(err);
        console.log(err);
    }
});
router.patch("/update/:id",validate,async(req,res,next)=>{

    try
    {
        let {id} =req.params;
        let { userName, homeAddress, idCardNumber, nation, qqNumber, weChat, avatar}=req.body;
        let data=await user.findOne({_id:id});/**返回来的data仍然是一个mongoose对象*/
        let updatedata= await data.update({$set:{userName, homeAddress, idCardNumber, nation, qqNumber, weChat, avatar}});

        res.json({
            code:200,
            msg:"修改信息成功",
            data:updatedata
        })

    }catch(err)
    {
        next(err);
    }



})
module.exports=router