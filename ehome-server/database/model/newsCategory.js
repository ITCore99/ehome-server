const mongoose=require("mongoose");
var Schema=mongoose.Schema;
const newsCategorySchema=new mongoose.Schema({
    label:{
        type:String,
    },
    value:{
        type:String,
        unique:true,
    }
},{versionKey:false,timestamps:{createdAt:"createTime",updateAt:"updateTime"}});
module.exports=mongoose.model("categories",newsCategorySchema)