import userModel from '../models/userModel.js';


export const getUserData = async (req, res) => {
  try {
    const userId = req.userId; // ✅ FIX HERE
    console.log('📥 Getting data for user ID:', userId);

    const user = await userModel.findById(userId);
    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        username: user.username,
        mobileNumber: user.mobileNumber,
        dateofBirth: user.dateofBirth,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (err) {
    console.log('❌ Error:', err.message);
    return res.status(500).json({ message: err.message });
  }
};
