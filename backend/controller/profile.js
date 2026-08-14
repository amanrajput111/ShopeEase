const User = require("../model/user.model");

const getProfile = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found.",
      });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Profile Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { getProfile };