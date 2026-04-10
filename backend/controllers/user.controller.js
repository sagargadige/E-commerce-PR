import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import envConfig from "../configs/envConfig.js";

//SIGN UP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required..",
      });
    } else {
      const data = await userModel.findOne({ email });

      if (data) {
        return res.status(400).json({
          success: false,
          message: "User Exists..",
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
          name,
          email,
          password: hashPassword,
        });
        return res.status(201).json({
          success: true,
          message: "Signup Successfull",
          user: newUser,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//LOG IN 

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body

        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found :("
            })
        }else{
            const isValid= await bcrypt.compare(password,user.password);
            if(!isValid){
                return res.status(400).json({
                    success:false,
                    message:"Wrong Password"
                })
            }
            else{
              const token=jwt.sign({id:user.id},envConfig.SECRET_KEY,{expiresIn:'1d'});
                return res.status(200).json({
                    success:true,
                    message:"User Information",
                    user:user,
                    token:token
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}