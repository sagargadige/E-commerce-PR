import mongoose from "mongoose";
import categoryModel from "./category.model.js";
const productSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    image:String,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categoryModel'
    }
})

const productModel=mongoose.model('products',productSchema);

export default productModel;
