import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

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
          message: "User Exit..",
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
          message: "Login Successfull",
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
                return res.status(200).json({
                    success:true,
                    message:"User created",
                    user:user
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