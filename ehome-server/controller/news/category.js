const {Router}= require("express");
const router=Router();
const validate=require("../../config/validate");
const category=require("../../database/model/newsCategory");

router.post("/add", async(req,res,next)=>{
     try{
         let{label,value}=req.body;

         if(label&&value)
         {
             label=label.trim();
             value=value.trim();
             let data= await category.create({label,value});
             if(data)
             {
                 res.json({
                     code:"200",
                     msg:"分类添加成功"
                 })
             }else
             {
                 res.json({
                     code:"400",
                     msg:"分类添加失败"
                 })
             }
         }
     }catch(err)
     {
        next(err);
     }
});
    router.get("/getCategory",async (req,res,next)=>{
       try
       {
           let data=await category.find();
           if(data)
           {
               res.json({
                   code:200,
                   msg:"获取数据成功",
                   data,
               })
           }else
           {
               res.json({
                   code:400,
                   msg:"获取数据失败"
               })
           }
       }catch(err)
       {
           next(err);
       }
});
module.exports=router;