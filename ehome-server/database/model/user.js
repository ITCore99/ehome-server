const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const user = new mongoose.Schema({
    // avatar: {
    //     type: String,     //默认分配一个头像
    //     default: "http://pbl.yaojunrong.com/icon_default.png"
    // },
    userName: {
        type: String,
        require: true
    },
    idCardNumber: {
        type: String,    //登录用的身份证号
        require: true,
        unique: true,
        index: true   //增加索引，优化查找速度
    },
    // homeAddress: {
    //     type: String,
    //     default: ""   //家庭地址
    // },
    // workAddress: {          //工作地址
    //     type: String,
    //     default: ""
    // },
    // nation: {               //民族
    //     type: String,
    //     default: ""
    // },
    // weChat: {               //微信号
    //     type: String,
    //     default: ""
    // },
    // qqNumber: {             //QQ号
    //     type: String,
    //     default: ""
    // },
    // sex: {                  // 性别  。男性1，女性0默认为男
    //     type: Number,
    //     default: 1
    // },
    // education: {            //当前学历
    //     type: String,
    //     default: ""
    // },
    // jobTitle: {
    //     type: String,
    //     default: ""     //当前职称
    // },
    // emolument: {       //薪资水平
    //     type: String,
    //     default: ""
    // },
    // enterPartyTime: {       //入党时间
    //     type: Date,
    //     default: null
    // },
    // paymentTime: {          // 党费最后缴纳时间
    //     type: Date,
    //     default: null
    // },
    // partyStatus: {          //当前身份  1为党员、2为预备党员、3为积极分子
    //     type: Number,
    //     default: 1
    // },
    pwd: {                      //用户密码
        type: String,
        default: '123456'
    },
    // phone: {                //手机号码
    //     type: String,
    //     default: ""
    // },
    // level: {                //等级，level 0管理员。level1用户
    //     type: Schema.Types.Mixed,
    //     default() {
    //         return {
    //             type: 1,
    //             levelName: "普通用户"
    //         }
    //     }
    // },
    // isCanLogin: {   // 是否被管理员禁用
    //     type: Boolean,
    //     default: true
    // },
    // branchId: {    //分支ID
    //     type: String,
    //     default: "5ad3842650282d2750712178"
    // },
    // branchName: {  //分支名
    //     type: String,
    //     default: "信息工程学院学生流动党支部（北京）"
    // }
}, {versionKey: false})

module.exports = mongoose.model("user", user)
