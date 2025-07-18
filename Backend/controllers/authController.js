import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE , WELCOME_TEMPLATE} from '../config/emailTemplets.js';


export const register = async (req, res)=>{

    const { name, email, password, mobileNumber, username } = req.body;
    if (!name || !email || !password || !mobileNumber || !username) {
        return res.json({ success: false, message: "Missing Details" });
      }

    try{
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.json({success:false, message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            mobileNumber,
            username
          });
          
        await user.save()

        //+++++++++++++++++ Now Generate Token For Auth++++++++++++++++++++++++

        //we are send this token using cookie.
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})

         res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,               // ✅ Force secure, always true on Render
            sameSite: 'None',           // ✅ Case-sensitive! Must be capital 'N'
            maxAge: 1 * 24 * 60 * 60 * 1000,
          });
          

        //we are send wellcome email to user...
        const mailOptions = {
            from: `"E-CELL SMVIT" <${process.env.SENDER_EMAIL}>`,
            to: user.email,
            subject: 'Welcome to our site',
            html: WELCOME_TEMPLATE.replace("{{name}}", user.name)

        }
        await transporter.sendMail(mailOptions)

        return res.json({success:true, })


    } catch(err) {
        res.json({success:false, message: err.message})
    }
}

export const login = async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success:false, message:"Email and Password are required"});
    }

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"Invalid Email"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.json({success:false, message:"Invalid Password"})
        }



         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})

         res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,               
            sameSite: 'None',           
            maxAge: 1 * 24 * 60 * 60 * 1000,
          });
          
        return res.json({success:true, })

    } catch(err) {
        res.json({success:false, message: err.message}) 
    }
}

export const logout = (req, res)=>{
    try {
        res.clearCookie('accessToken',{
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });
        return res.json({success:true, message:"Logged Out"})
    }catch (err) {
        res.json({success:false, message: err.message})
    }
}


//Send verification OPT to user email
export const sendVerifyOtp = async (req, res) => {
    console.log("💡 Incoming userId:", req.userId);
    console.log("📥 Received body:", req.userId)
    try {
      const  userId  = req.userId;
      console.log("🔍 userId from middleware:", userId);
      if (!userId) return res.status(400).json({ success: false, message: "userId missing" });
  
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      if (user.isAccountVerified) {
        return res.json({ success: false, message: "Account already verified" });
      }
  
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      user.verifyOtp = otp;
      user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
      await user.save();
  
      const mailOptions = {
        from: `"E-CELL SMVIT" <${process.env.SENDER_EMAIL}>`,
        to: user.email,
        subject: 'Account Verification OTP',
        html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email),
      };
  
      try {
        await transporter.sendMail(mailOptions);
        console.log("✅ OTP email sent to:", user.email);
        return res.json({ success: true, message: "Verification OTP sent to your email" });
      } catch (mailErr) {
        console.error("❌ Email send error:", mailErr);
        return res.status(500).json({ success: false, message: "Email send failed", error: mailErr.message });
      }
  
    } catch (err) {
      console.error("❌ Error in sendVerifyOtp:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  


//Verify OTP and update user account to verified
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user._id;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired. Please request a new OTP" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Account verified successfully" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};




export const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.accessToken
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.userId = decoded.id
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" })
  }
}


//send RESET PASSWORD OTP to user email
export const sendRestOtp = async(req, res)=>{
    const {email} = req.body;
    if(!email){
        return res.json({success:false, message:"Email is required"})
    }

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User not found"})
        }
                //generate OTP send user email.
                const otp = String(Math.floor(100000 + Math.random() * 900000)) //6 digits random number
                user.resetOtp = otp
                user.resetOtpExpireAt = Date.now() + 15*60*1000 //15 minutes
                await user.save()
        
                //now send otp to user email.
                const mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: user.email,
                    subject: 'Password Reset OTP',
                    // text: `Hello ${user.name}, Your OTP for password reset is ${otp}. It will expire in 15 minutes`
                    html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
                }
                //send email
                await transporter.sendMail(mailOptions)

                return res.json({success:true, message:"Password Reset OTP sent to your email"})
        
    }catch(err) {
        return res.json({success:false, message: err.message})
    }
}

//Verify OTP and update user password
export const resetPassword = async(req, res)=>{
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.json({success:false, message:"Email, OTP and New Password required"})
    }

    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        if(user.resetOtp === '' || user.resetOtp!== otp){
            return res.json({success:false, message:"Invalid OTP"})
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false, message:"OTP expired. Please request a new OTP"})
        }

        //if OTP is valid.
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.resetOtp = ''
        user.resetOtpExpireAt = 0
        await user.save()

        return res.json({success:true, message:"Password has been reset successfully"})
    }catch(err) {
        return res.json({success:false, message: err.message})
    }
}