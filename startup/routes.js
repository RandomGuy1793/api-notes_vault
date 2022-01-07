const express=require('express')
const cors=require('cors')
const error=require('../middleware/error')
const {root}=require('../routes/root')
const {register}=require('../routes/register')
const {login}=require('../routes/login')
const {notes}=require('../routes/notes')

module.exports=function(app){
    app.use(express.json())
    app.use(cors({
        origin: '*',
        exposedHeaders: ['x-auth-token'],
    }))
    app.use('/', root);
    app.use('/api/register', register);
    app.use('/api/login', login)
    app.use('/api/notes', notes)
    app.use(error)
}