const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const comment=new mongoose.Schema({
      content:String,
      userId:{
          type:Schema.Types.ObjectId,
          ref:"users"
      },
      topicId: {
              type:Schema.Types.ObjectId,
              ref:"topics"
          }
},{versionKey:false,timestamp:{createdAt:"createTime",updatedAt:"updateTime"}});

module.exports=mongoose.model("comments",comment)