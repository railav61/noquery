const jwt = require("jsonwebtoken");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN);

    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(200).json({ message: "Invalid token." });
  }
};


const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Access denied. Admin rights required." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
