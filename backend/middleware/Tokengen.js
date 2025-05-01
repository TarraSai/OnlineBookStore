const jwt = require("jsonwebtoken");
 const tokenverify = (req, res, next) => {

    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }
   console.log("Decoded token:");
    req.user = decoded;
    next();
}
const verifyAdmin = (req, res, next) => {
    
  if (req.user && req.user.isAdmin === "admin") {
    console.log("Admin access granted");
     return next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = {tokenverify,verifyAdmin};
 
