const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const topic=new mongoose.Schema({
      content:{
          type:String,
          required:true,
      },
      userId:{
          type:Schema.Types.ObjectId,
          ref:"users"
      },
      commets:[{
          type:Schema.Types.ObjectId,
          refs:"comments"
      }]

},{versionKey:false,timestamp:{createdAt:"createTime",updatedAt:"updateTime"}});
module.exports=mongoose.model("topics",topic)