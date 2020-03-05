const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"

exports.connect = () => {
  //链接数据库
  mongoose.connect(db)
  let maxConnectTime = 0;

  return new Promise((resolve, reject) => {
    //增加数据库的监听事件
    mongoose.connection.on('disconnection', () => {
      console.log("**************数据库断开**************")
      if(maxConnectTime<=3){
        maxConnectTime++;
        mongoose.connect(maxConnectTime);
      }else{
          reject()
          throw new Error('数据库出现问题，程序无法搞定，请人为处理......')
      }
      
    })

    mongoose.connection.on('error', (err) => {
      console.log("**************数据库错误**************")
      if(maxConnectTime<=3){
        maxConnectTime++;
        mongoose.connect(maxConnectTime);
      }else{
          reject(err)
          throw new Error('数据库出现问题，程序无法搞定，请人为处理......')
      }
    })

    //链接打开时
    mongoose.connection.once('open', () => {
      console.log("MongoDB connected successfully");
      resolve()
    })
  })


}
