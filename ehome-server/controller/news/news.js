const {Router}=require("express");
mongoose =require("mongoose")
const router=Router();
const news=require("../../database/model/news");
const validate =require("../../config/validate");


router.post("/add",async(req,res,next)=>{
    try{
         let{avatar,title,contText,contTextHTML,author,category}=req.body
         if(avatar,title&&contText&&contTextHTML&&author&&category)
         {
            let data= await  news.create({avatar,title,contText,contTextHTML,author,category});
            if(data)
            {
                res.json({
                    code:200,
                    msg:"添加成功"
                })
            }

         }else
         {
             res.json({
                 code:400,
                 msg:"缺少必要参数"
             })
         }

    }catch(err)
    {
        next(err)
    }

});
router.get("/newsList",validate,async (req,res,next)=>{
    try
    {
        let {pn=1,size=10}=req.body;
        pn=parseInt(pn);
        size=parseInt(size);
        let data=await news.find().skip((pn-1)*size).limit(size).sort({_id:-1}).populate({
            path:"author",
        }).populate({
            path:"category"
        });
        if(data)
        {
            res.json({
                code:200,
                msg:"获取成功",
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
        next(err)
    }
});
router.delete("/del",validate,async(req,res,next)=>{
      try
      {
          let id=req.query.id;
          console.log(id);
          if(id&&id.trim())
          {
              let data=await news.remove({_id:id});
              console.log(data);
              if(data.n)
              {
                  res.json({
                      code:200,
                      msg:"删除成功"
                  })
              }else
              {
                  res.json({
                      code:400,
                      msg:"删除失败"
                  })
              }
          }else
          {
              console.log("缺少必要参数")
          }
      }catch(err)
      {
          next(err)
      }
});
router.get("/select/:id",async(req,res,next)=>{
    try
    {
        let {id}=req.params;
        console.log(id)
        if(id)
        {
            let data=await news.find({category:id});
            console.log(data);
            if(data)
            {
                res.json({
                    code:200,
                    msg:"数据获取成功",
                    data,
                })
            }
        }else
            {
                res.json({
                    code:400,
                    msg:"数据获取失败",
                })
            }
    }catch(err)
    {
        next(err);
    }
});
module.exports=router