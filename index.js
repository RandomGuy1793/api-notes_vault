const express=require('express')
const app=express()

require('./startup/errorLog')()
require('./startup/config')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/prod')(app)

const PORT=process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Server active on port ${PORT}`))