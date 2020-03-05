const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

//创建UserSchema
const userSchema = new Schema({
    UserId: {type:ObjectId},
    UserName: {unique:true,type:String},
    password: String,
    creatAt: {type:Data,default:Data.now()},
    lastLoginAt:{type:Data,default:Data.now()}
})

//发布模型
mongoose.model('User',userSchema)