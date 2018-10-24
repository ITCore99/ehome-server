const {Router} =require("express");
const router=Router();
const validate=require("../../config/validate")
const swiperModel=require("../../database/model/swiper")

router.post("/add",validate,async(req,res,next)=>{

    try{

        let {avatar,title,sort,state,newsId}=req.body;
        if(avatar&&title&&sort&&state&&newsId)
        {
            let data=await swiperModel.create({avatar,title,sort,state,newsId});
            res.json({
                code:200,
                msg:"添加成功"
            })
        }else
        {
            res.json({
                code:400,
                msg:"缺少必要的参数"
            })
        }


    }
    catch (err)
    {
        console.log(err);
        next(err);

    }
});
router.get("/getList",validate,async(req,res,next)=>{

     try
     {
         let data=await swiperModel.find().sort({sort:-1}).populate({
             path:"newsId"
         });
         res.json({
             code:200,
             msg:"获取数据成功",
             data
         })
     }
     catch (err)
     {
         console.log(err);
         next(err);


     }
});
router.get("/getSwiper/:id",validate,async(req,res,next)=>{
    try
    {
        let {id}=req.params;
        if(id)
        {
          let data=await swiperModel.findOne({_id:id}).populate({
              path:"newsId"
          });
          res.json({
              code:200,
              msg:"获取数据成功",
              data
          })

        }else
        {
            res.json({
                code:400,
                msg:"缺少必要的参数"
            })
        }
    }catch(err)
    {
        console.log(err)
        next(err);
    }
})
module.exports=router;