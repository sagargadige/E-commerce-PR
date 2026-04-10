import jwt from 'jsonwebtoken'
import envConfig from '../configs/envConfig.js';
import userModel from '../models/user.model.js';
const userAuth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        try {
            const decoded=jwt.verify(token,envConfig.SECRET_KEY);
            if(decoded){
                const user= await userModel.findById(decoded.id);
                if(user){
                    req.user=user;
                    next()
                }
            }else{
                return res.status(401).json({
                    success:false,
                    message:"User not Found :( Please login"
                })
            }
        } catch (error) {
            if(error.name === 'TokenExpiredError'){
                return res.status(401).json({
                    success:false,
                    message:"Token is Expired Please login again.."
                })
            }else{
                return res.status(401).json({
                    success:false,
                    message:error.message
                })
            }
        }
    } catch (error) {
        return res.status(401).json({
                    success:false,
                    message:"Please Login again"
                })
    }
}

export default userAuth;