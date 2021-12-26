const express=require('express')
const _=require('lodash')
const Joi=require('joi')
const bcrypt=require('bcrypt')
const {User}=require('../model/user')

const router=express.Router();

router.get('/', (req, res)=>res.send("login working"))

router.post('/', async (req, res)=>{
    const error=loginValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user=await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("invalid email or password");

    const correctPass=await bcrypt.compare(req.body.password, user.password);
    if(!correctPass) return res.status(400).send("invalid email or password");

    const token=user.generateAuthToken();
    res.send(token);
})

const loginValidate=(user)=>{
    const schema=Joi.object({
        email: Joi.string().email().min(3).max(50).required(),
        password: Joi.string().min(3).max(255)
    })
    return schema.validate(user).error;
}

exports.login=router;