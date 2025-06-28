import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid Authorization" });
    }

    const token_decode = jwt.decode(token);
    if (!token_decode || !token_decode.clerkId) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    
    req.user = { clerkId: token_decode.clerkId };

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default authUser;
