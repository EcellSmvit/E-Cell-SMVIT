import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const userAuth = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, please login first"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?._id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please login again"
      });
    }

    const user = await userModel.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user; // Attach full user to req
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Session expired or invalid. Please login again."
    });
  }
};

export default userAuth;
