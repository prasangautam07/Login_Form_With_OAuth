import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';


export const verifyUser = async (req, res, next)=>{
    try{
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded= jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select('-password -refreshToken');
        if(!user){
            return res.status(401).json({message:"Invalid token"});
        }
        req.user = user;
        next();
    }catch(err){
        console.log("Error verifying user:", err);
        res.status(401).json({message:"Unauthorized"});
    }
}
