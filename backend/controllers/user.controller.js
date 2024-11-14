import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing ,please check!",
                success: false
            });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({
                message: "try different emailid",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        });

    } catch (error) {
        console.log(error)
    }
}
export const login = async(req,res) => {
    try{
    const{email,password } = req.body;
    if(!email||!password){
        return res.status(401).json({
            message: "Something is missing ,please check!",
            success: false
        });
    }
    let user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            message: "Incorrect Email or Password",
            success: false
        });
    }
    const isPasswordMatched = await bcrypt.compare(password,user.password);
    if(!isPasswordMatched ){
        return res.status(401).json({
            message: "Incorrect Email or Password",
            success: false
        });
    }
    const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});
    const populatedPosts = await Promise.all(
        user.posts.map( async (postId) => {
            const post = await Post.findById(postId);
            if(post.author.equals(user._id)){
                return post;
            }
            return null;
        })
    )
    user = {
        _id:user._id,
        username:user.username,
        email:user.email,
        profilePicture:user.profilePicture,
        bio:user.bio,
        followers:user.followers,
        following:user.following,
        posts:populatedPosts
    }
    
    return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({
        message:`Welcome back ${user.username}`,
        success:true,
        user
    })
    } catch(error){
       console.log(error);
    }
}
export const logout = async(_,res) => {
    try{
   return res.cookie("token","",{maxAge:0}).json({
    message:"Logged out sucessfully",
    success:true
   });
    } catch(error){
     console.log(error)
    }
}
export const getProfile = async(req,res) => {
    try{
       const userId = req.params.id;
       let user = await User.findById(userId).select('-password');
       return res.status(200).json({
        user,
        success:true
       })
    }
    catch(error){
     console.log(error)
    }
}
export const editProfile = async(req,res) => {
    try{
    const userId = req.id;
    const{bio,gender} = req.body;
    const profilePicture = req.file;
    let cloudResponse;
    if(profilePicture){
        const fileUri = getDataUri(profilePicture);
        cloudResponse = await cloudinary.uploader.upload(fileUri)
    }
    const user = await User.findById(userId).select("-password")
    if(!user){
        return res.status(404).json({
            message:"user not found ",
            success: false
        })
    }
    if(bio) user.bio = bio;
    if(gender) user.gender = gender;
    if(profilePicture) user.profilePicture = cloudResponse.secure_url;
    await user.save();
    return res.status(200).json({
        message:"profile updated successfully ",
        success: true,
        user
    })
    }
    catch(error){
        console.log(error);
    }
}
export const getSuggestedUser = async(req,res) => {
    try{
    const suggestedUsers = await User.find({_id:{$ne:req.id}}).select("-password");
    if(!suggestedUsers){
        return res.status(400).json({
            message:'Currently do not  have any users'
        })
    }
    return res.status(200).json({
        success:true,
        users:suggestedUsers
    })
    } catch(error){
        console.log(error);
    }
}
export const followOrUnfollow = async(req,res) => {
    try{
    const followKrneWala = req.id //khud mai
    const jiskoFollowKrunga = req.params.id // premika

    if(followKrneWala === jiskoFollowKrunga ){
        return res.status(400).json({
            message:'you cannot follow/unfollow yourself',
            success:false
        })
    }
    const user = await User.findById(followKrneWala) // mai
    const targetUser= await User.findById(jiskoFollowKrunga)//premika
    if(!user || !targetUser){
        return res.status(400).json({
            message:'User not found',
            success:false
        })
    }
    //check for follow or unfollow 
    const isFollowing = await user.following.includes(jiskoFollowKrunga)
    if(isFollowing){
        //unfollow logic
        await Promise.all([
            User.updateOne({_id:followKrneWala},{$pull : {following:jiskoFollowKrunga}}),
            User.updateOne({_id:jiskoFollowKrunga},{$pull :{followers:followKrneWala}})
        ])
        return res.status(200).json({
            message:"Unfollowed Successfully",
            success:true
        })
    }
    else{
        // follow logic
        await Promise.all([
            User.updateOne({_id:followKrneWala},{$push : {following:jiskoFollowKrunga}}),
            User.updateOne({_id:jiskoFollowKrunga},{$push :{followers:followKrneWala}})
        ])
        return res.status(200).json({
            message:"followed Successfully",
            success:true
        })
    }
    }catch(error){
        console.log(error)
    }
}