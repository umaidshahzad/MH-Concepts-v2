const jwt=require("jsonwebtoken")
require("dotenv").config();
exports.auth=(req,res,next)=>{
//extract token
try {
    const token=req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if(!token){
        return res.status(404).json({
            success:false,
            message:"Token Missing"

        })
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decode;
    next();
} catch (error) {
    res.status(401).json({ message: "Invalid token" });
}

}
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Only Admins are allowed to perform this Action" });
    }
    next();
};