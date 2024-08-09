const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'please provide a name'],
        minlength:[4,'min lenght for user name is 4']
    },
    email:{
        type:String,
        required:[true,'please provide an email address'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'please provide a password'],
        minlength:[8,'password min lenght must be 8']
    }
},{timestamps:true})

// HASHING PASSWORD
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

// PASSWORD COMPARISON
userSchema.methods.comparepassword = async function(userpassword){
    const iscorrect = await bcrypt.compare(userpassword,this.password)
    return iscorrect

}

// generate token

userSchema.methods.generateToken = async function(params){
    let token = jwt.sign({userId : this._id},process.env.JWT_SECRETE)
    return token 

}

const USER = mongoose.model('user',userSchema);
module.exports = USER
