const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"

exports.connect = ()=>{
    //链接数据库
    mongoose.connect(db)
    
    //增加数据库的监听事件
    mongoose.connection.on('disconnection',()=>{
        console.log("*******数据库断开********")
        mongoose.connect(db)
    })
}