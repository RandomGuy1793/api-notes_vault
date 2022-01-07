const winston = require('winston')
require('express-async-errors')

module.exports=function(){
    process.on('uncaughtException', (ex)=>{
        winston.error(ex.message, ex)
        setTimeout(() => {
            process.exit(1);
        }, 5000)
    })
    process.on('unhandledRejection', (ex)=>{
        winston.error(ex.message, ex)
        setTimeout(() => {
            process.exit(1);
        }, 5000)
    })
    winston.add(new winston.transports.File({filename: 'logfile.log'}))
    winston.add(new winston.transports.Console())
}