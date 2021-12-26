const express=require('express')
const mongoose=require('mongoose')
const {root}=require('./routes/root')
const {register}=require('./routes/register')
const {login}=require('./routes/login')
const {notes}=require('./routes/notes')
const app=express()
app.use(express.json())
app.use('/', root);
app.use('/api/register', register);
app.use('/api/login', login)
app.use('/api/notes', notes)

mongoose.connect('mongodb://localhost:27017/notes_vault')
.then(()=> console.log('connected to mongoDB'))
.catch(()=>console.log('error connecting to mongoDB'))

const PORT=process.env.notes_vault_port || 4000
app.listen(PORT, ()=>console.log(`Server active on port ${PORT}`))