export const getUserData = async (req, res) => {
    try {
      console.log('📥 Reached getUserData');
      console.log('🔐 req.userId:', req.userId);
  
      if (!req.userId) {
        return res.status(401).json({ success: false, message: "Unauthorized - no userId" });
      }
  
      const user = await userModel.findById(req.userId);
      if (!user) {
        console.log('❌ No user found with ID:', req.userId);
        return res.status(404).json({ success: false, message: "User not found" });
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
      console.log('❌ Exception in getUserData:', err.message);
      return res.status(500).json({ message: err.message });
    }
  };
  