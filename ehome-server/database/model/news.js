const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const news=new mongoose.Schema({
      avatar:String,
      title:{
          type:String,
          default:"这是一篇没名字的新闻"
      },
      contText:{
          type:String,
          default:"坚持跟着党走100年"
      },
      contTextHTML: {
             type:"String",
             default:"<p>坚持跟着党走100年</p>"
          },
      author:{
          type:Schema.Types.ObjectId,
          ref:"users"
      },
      category:{
          type:Schema.Types.ObjectId,
          ref:"categories"
      }
},{versionKey:false,timestamp:{createdAt:"createTime",updatedAt:"updateTime"}});
module.exports=mongoose.model("news",news);