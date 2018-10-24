const {Router} =require("express");
const router=Router();
const validate=require("../../config/validate")
const topicModel=require("../../database/model/topic")

router.post("/add",validate,async(req,res,next)=>{
    try
    {
        let {content}=req.body;
        if(content)
        {
            let userId=req.session.userInfo._id;
            let data=await topicModel.create({content,userId});

            res.json({
                code:200,
                msg:"添加成功"
            })
        }else
        {
            res.json({
                code:400,
                msg:"缺少必要参数"
            })
        }

    }catch(err)
    {
        console.log(err);
        next(err);
    }
});
router.get("/getList",validate,async(req,res,next)=>{
    try
    {
        let {pn=1,size=10}=req.params
        pn=parseInt(pn);
        size=parseInt(size);
        let data=await topicModel.find().skip((pn-1)*size).limit(size).sort({_id:1}).populate({
            path:"userId",
            select:"-pwd"
        });

        res.json({
            code:200,
            msg:"获取数据成功",
            data
        })


    }catch(err)
    {
        console.log(err);
        next(err);
    }
});
router.get("/getTopic/:id",validate,async(req,res,next)=>{
   try
   {
       let {id}=req.params;
       let data=await topicModel.findOne({_id:id}).populate({
           path:"userId",
           select:"-pwd"
       })
       res.json({
           code:200,
           msg:"获取成功",
           data
       })

   }catch(err)
   {
       console.log(err);
       next(err);

   }
});
module.exports=router;