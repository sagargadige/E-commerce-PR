import { Router } from "express";
import { getAllUsers, login, signup } from "../controllers/user.controller.js";
import userAuth from "../middlewares/userAuth.js";
import adminAuth from "../middlewares/adminAuth.js";

const userRouter=Router();

userRouter.get('/',userAuth,adminAuth,getAllUsers);
userRouter.post('/login',login);
userRouter.post('/signup',signup);
export default userRouter;
