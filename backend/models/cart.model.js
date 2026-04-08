import mongoose from "mongoose";
import ProductModel from "./product.model.js";
import UserModel from "./user.model.js";

const cartSchema= new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'productModel'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    }
})

const cartModel=mongoose.model('carts',cartSchema);

export default cartModel;