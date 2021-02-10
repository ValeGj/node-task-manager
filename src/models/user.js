const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    }, password:{
        type:String,
        required:true,
        minLength: 7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    email:{
        type:String,
        unique: true,
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }        
    },
    age: {

        type: Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    }
});

//middleware
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user)
    {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}

//Hash te plain text password before saving
userSchema.pre('save',async function (next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    next();
})

//userSchema.index({email: 1}, {unique: true}); //This doesn't work for me even if it makes logic 
const User = mongoose.model('User',userSchema);
module.exports = User;