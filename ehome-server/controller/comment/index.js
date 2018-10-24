const {Router}=require("express");
const router=Router();
const validate=require("../../config/validate")
const topicModel=require("../../database/model/topic")
const commentModel=require("../../database/model/comment")

router.post("/add",validate,async(req,res,next)=>{
    try
    {
        let {topicId,content}=req.body;
        if(topicId&&content)
        {
            let userId=req.session.userInfo._id;
            let topic=await topicModel.findOne({_id:topicId});
            let data=await commentModel.create({content,topicId,userId});
            let temp=await topic.update({$push:{commets:data._id}});

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
       let account=await commentModel.count();
       let data=await commentModel.find().sort({_id:-1}).populate({
           path:"userId",
           select:"-pwd"
       }).populate({
           path:"topicId",
       })

       res.json({
           code:200,
           msg:"获取数据成功",
           account,
           data
       });

   }catch(err)
   {
       console.log(err);
       next(err);
   }
});
router.get("/getComment/:id",validate,async(req,res,next)=>{
   try
   {
       let {id}=req.params;
       if(id)
       {
           let data=await commentModel.findOne({_id:id}).populate({
               path:"userId",
               select:"-pwd"
           }).populate({
               path:"topicId"
           })

           res.json({
               code:200,
               msg:"获取成功",
               data
           })

       }else{
           res.json({
               code:400,
               msg:"缺少必要的参数"
           })
       }

   }catch(err)
   {
        console.log(err);
        next(err);
   }
});
/**根据主题的评论时*/
router.get("/getTopicComment/:id",validate,async(req,res,next)=>{
    try
    {
        let{id}=req.params;
        let data=commentModel

    }catch(err)
    {
        next(err);
    }
})
module.exports=router;
