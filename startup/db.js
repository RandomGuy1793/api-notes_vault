const mongoose=require('mongoose')
const winston = require('winston')

module.exports=function(){
    mongoose.connect('mongodb://localhost:27017/notes_vault')
    .then(()=>winston.info('connected to mongoDB'))
}