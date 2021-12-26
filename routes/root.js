const express=require('express')

const router=express.Router();

router.get('/', (req, res)=>res.send("welcome to notes_vault"))

exports.root=router