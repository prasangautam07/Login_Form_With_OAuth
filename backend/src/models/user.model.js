import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trinm:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:false,
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true});

userSchema.pre('save', async function(){
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePasssword = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id:this._id,
        fullname:this.fullname,
        email:this.email,
        username:this.username,
    }, 
    process.env.ACCESS_TOKEN_SECRET, 
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
};
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({id:this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:process.env.REFRESH_TOKEN_EXPIRY});
}
export const User= mongoose.model('User', userSchema);