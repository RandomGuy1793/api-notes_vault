const mongoose=require('mongoose')
const winston = require('winston')
const config=require('config')

module.exports=function(){
    mongoose.connect(config.get('mongoDb'))
    .then(()=>winston.info('connected to mongoDB'))
}