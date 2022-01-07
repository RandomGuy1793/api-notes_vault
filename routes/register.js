const express=require('express')
const _=require('lodash')
const Joi=require('joi')
const bcrypt=require('bcrypt')
const {User}=require('../model/user')

const router=express.Router();

router.get('/', (req, res)=>res.send("register working"))

router.post('/', async (req, res)=>{
    const error=userValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user=await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User already registered");

    const newUser=new User(_.pick(req.body, ['name', 'email', 'password']))
    newUser.password=await bcrypt.hash(newUser.password, 10);
    console.log(newUser);
    await newUser.save();
    const token=newUser.generateAuthToken();
    console.log(token);
    res.header('x-auth-token', token).send(_.pick(newUser, ['_id', 'name', 'email']));
})

const userValidate=(user)=>{
    const schema=Joi.object({
        email: Joi.string().email().min(3).max(50).required(),
        name: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(255)
    })
    return schema.validate(user).error;
}

exports.register=router