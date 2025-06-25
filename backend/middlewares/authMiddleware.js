const jwt= require("jsonwebtoken");
const User = require("../models/User");

//Middleware to protect routes
const protect = async (req,res,next) =>{
  try{
    let token=req.headers.authorization;

    if(token && token.startsWith("Bearer")){
      token=token.split(" ")[1]; // Extract the token from Bearer format
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      req.user = await User.findById(decoded.id).select("-password"); // Find the user and exclude password
      next(); // Proceed to the next middleware or route handler
    }
    else
    {
      response.status(401).json({message: "Not authorized, no token"}); // If no token is provided
    }
  }  catch(error){
    response.status(401).json({message: "Not authorized, token failed",error:error.message}); // If token verification fails
  }
};


//middleware for admin access only
const adminOnly = (req, res, next) => {
  if(req.user && req.user.role === "admin") {
    next(); // If user is admin, proceed to the next middleware or route handler
  }
  else
  {
    res.status(403).json({message: "Access denied, admin only"}); // If user is not admin, deny access
  }

};

module.exports = {protect, adminOnly}; // Export the middleware functions for use in routes