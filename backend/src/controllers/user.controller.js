import { User } from '../models/user.model.js';

export const registerUser = async (req, res)=>{
    try{
        const {fullname, email, username, password} = req.body;
        const {avatar} = req.file || {};

        const existingUserWithEmail = await User.findOne({email});
        const existingUserWithUsername = await User.findOne({username});

        if(existingUserWithEmail){
            return res.status(400).json({message:"User with this email already exists"});
        }
        if(existingUserWithUsername){
            return res.status(400).json({message:"User with this username already exists"});
        }

        const newUser = new User({
            fullname,
            email,
            username,
            password,
            avatar: avatar ? avatar.path : undefined,
        });
        await newUser.save();
        res.status(201).json({success:true,message:"User registered successfully"});

    }catch(err){
        console.log("Error registering user:", err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const loginUser = async (req, res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message:"User is not registered with this username."});
        }
        const isPasswordValid = await user.comparePasssword(password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid password"});
        }
        const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        const options = {
            httpOnly: true,
            secure: true,
        };
        res
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json({success:true, message:"User logged in successfully", user: loggedInUser});
    }catch(err){
        console.log("Error logging in user:", err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const logoutUser = async (req, res)=>{
    try{
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        await User.findByIdAndUpdate(
            req.user.id, 
            {
                $unset: {
                    refreshToken: undefined,
                }
            },
            {new:true}
        );
        const options = {
            httpOnly: true,
            secure: true,
        };
        res
            .status(200)
            .clearCookie('refreshToken', options)
            .clearCookie('accessToken', options)
            .json({success:true, message:"User logged out successfully"});
    }catch(err){
        console.log("Error logging out user:", err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getSession = async(req, res)=>{
    try{
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const user = await User.findById(req.user._id).select("-password -refreshToken");
        if(!user){
            return res.status(404).json({message:"User not found."})
        }
        res.status(200).json({user,loggedIn:true});
    }catch(err){
        console.log("Error while getting Session:",err);
        res.status(500).json({message:"Internal server Error."});
    }
}