import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true, 
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true
      },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default:"",
    },
    bannerImg: {
        type: String,
        default: "",
    },
    headline:{
        type: String,
		default: "SMVIT Member",
    },
    location: {
        type: String,
        default: "India",
    },
    about: {
        type: String,
        default: "",
    },
    experience: [
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],
    education: [
        {
            school: String,
            fieldOfStudy: String,
            startYear: Number,
            endYear: Number,
        },
    ],
    mobileNumber: {
        type: String,
        required: true,
        unique: true 
    },
    verifyOtp:{
        type: String,
        default: ''
    },
    verifyOtpExpireAt:{
        type: Number,
        default: 0
    },
    isAccountVerified:{
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
      },
    
      isAlumni: {
        type: Boolean,
        default: false
      },
    resetOtp:{
        type: String,
        default: ''
    }, 
    resetOtpExpireAt:{
        type: Number,
        default: 0
    },
    connections: [ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }
      ]

})

const userModel = mongoose.models.user || mongoose.model('user', UserSchema);
export default userModel