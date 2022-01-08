const express=require('express')
const config=require('config')
const app=express()

require('./startup/errorLog')()
require('./startup/config')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/prod')(app)

const PORT=config.get('PORT')
app.listen(PORT, ()=>console.log(`Server active on port ${PORT}`))