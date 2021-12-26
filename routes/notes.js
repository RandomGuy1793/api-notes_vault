const express=require('express');
const Joi = require('joi');
const {auth}=require('../middleware/auth')
const {User}=require('../model/user')
const router=express.Router();

router.get('/', auth, async (req, res)=>{
    const user=await User.findOne({_id: req.user._id})
    if(!user) return res.status(404).send("invalid user.")
    res.send(user.notes)
})

router.post('/add', auth, async (req, res)=>{
    const note=req.body;
    const error=validateNote(note);
    if(error) return res.status(400).send(error.details[0].message)
    const result=await User.updateOne({_id: req.user._id}, {
        $push: {notes: note}
    })
    if(result.modifiedCount>0) return res.send('added successfully')
    return res.status(404).send('user not available')
    // const user=await User.findOne({_id: req.user._id})
    // if(!user) return res.status(404).send("invalid user.")

    // user.notes.push(req.body)
    // await user.save();
    // res.send(user.notes[user.notes.length-1]);     // send the last element
})

router.put('/edit/:id', auth, async (req, res)=>{
    const note=req.body;
    const error=validateNote(note);
    if(error) return res.status(400).send(error.details[0].message)
    try{        // to handle invalid ids . so that server does not crash
        const result=await User.updateOne({_id: req.user._id, "notes._id": req.params.id}, {
            $set:{
                "notes.$.title": note.title,
                "notes.$.text": note.text
            }
        })
        if(result.modifiedCount>0) return res.send('updated successfully')
        return res.status(404).send('note not available')
    }
    catch(ex){
        return res.status(400).send('invalid id')
    }

    // const user=await User.findOne({_id: req.user._id})
    // if(!user) return res.status(404).send("invalid user.")

    // await user.notes.pull({_id: req.params.id})
    // await user.save();
})

router.delete('/delete/:id', auth, async (req, res)=>{
    try{        // to handle invalid ids . so that server does not crash
        const result=await User.updateOne({_id: req.user._id}, {
            $pull:{
                notes: {_id: req.params.id}
            }
        })
        if(result.modifiedCount>0) return res.send('deleted successfully')
        return res.status(404).send('note not available')
    }
    catch(ex){
        return res.status(400).send('invalid id')
    }


    // const user=await User.findOne({_id: req.user._id})
    // if(!user) return res.status(404).send("invalid user.")

    // await user.notes.pull({_id: req.params.id})
    // await user.save();
})


const validateNote=(note)=>{
    const schema=Joi.object({
        title:Joi.string().min(1).max(255),
        text:Joi.string().min(1).max(1024)
    })
    return schema.validate(note).error;
}

exports.notes=router



