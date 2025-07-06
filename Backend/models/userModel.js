import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true, unique: true },
    dateofBirth: { type: String, required: true }, // Note: field is 'dateofBirth', not 'dateOfBirth'
    verifyotp: { type: String, default: '' },
    verifyotpExpireAt: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 },
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;