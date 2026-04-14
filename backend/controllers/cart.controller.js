import cartModel from "../models/cart.model.js"

//CREATE CART
export const create=async(req,res)=>{
    try {
    const cart=await cartModel.create(req.body)
    return res.status(201).json({
        success:true,
        message:"Cart Created..",
        cart:cart
    })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message,
        })
    }    
}
//GET ALL CART
export const getAllCart=async(req,res)=>{
    try {
    const carts=await cartModel.find({})
    return res.status(201).json({
        success:true,
        message:"All Cart",
        carts:carts
    })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message,
        })
    }    
}
