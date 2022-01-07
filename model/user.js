const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const config=require('config')

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email:{
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minLength: 3,
        maxlength: 255,
        required: true
    },
    notes: [{
        title: {
            type: String,
            minlength: 1,
            maxlength: 255,
        },
        text: {
            type: String,
            minlength: 1,
            maxlength: 1024,
        }
    }]
})

const jwtKey=config.get('jwtKey');

userSchema.methods.generateAuthToken=function(){
    return jwt.sign({_id: this._id}, jwtKey)
}

const User=mongoose.model('User', userSchema);

exports.User=User