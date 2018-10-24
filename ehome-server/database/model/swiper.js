const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const swiper=new mongoose.Schema({
      avatar:String,
      title:{
          type:String,
          required:true,
      },
      sort:Number,
      state:Number,
      newsId:{
          type:Schema.Types.ObjectId,
          ref:"news"
      }

},{versionKey:false,timestamp:{createdAt:"createTime",updatedAt:"updateTime"}});

module.exports= mongoose.model("swipers",swiper)