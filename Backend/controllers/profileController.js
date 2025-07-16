import cloudinary from "../config/cloudinary.js"
import userModel from "../models/userModel.js"


export const getPublicProfile = async(req,res) =>{
    try {
        console.log("🌐 Getting profile for username:", req.params.username);
        const user = await userModel.findOne({username: req.params.username}).select("-password");
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        res.json({ data: user });
    } catch (error) {
        console.error("Error in get getpublicProfile controller:",error)
        res.status(500).json({success:false,message:"Server error"})
    }
};

export const updateProfile = async(req,res)=>{
    try {
        const allowedFields = [
            "name",
            "username",
            "headline",
            "about",
            "location",
            "profilePicture",
            "bannerImg",
            "skills",
            "experience",
            "education",
        ];
        const updatedData ={};

        for(const field of allowedFields){
            if(req.body[field]){
                updatedData[field] = req.body[field];
            }
        }
        
        if(req.body.profilePicture){
            const result = await cloudinary.uploader.upload(req.body.profilePicture);
            updatedData.profilePicture = result.secure_url;
        }
        if(req.body.bannerImg){
            const result = await cloudinary.uploader.upload(req.body.bannerImg);
            updatedData.bannerImg = result.secure_url;
        }
        const user = await userModel.findByIdAndUpdate(req.user._id,{$set:updatedData},{new:true}).select("-password");
        res.json(user);
    } catch (error) {
        console.error("Error in updateProfile Controller:",error)
        res.status(500).json({success:false,message:"Server error"})
    }
}