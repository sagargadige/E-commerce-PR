import cartModel from "../models/cart.model.js";

//CREATE CART
export const create = async (req, res) => {
  try {
    const { product } = req.body;
    const user = req.user.id;
    if (!user || !product) {
      return res
        .status(400)
        .json({ success: false, message: "User and product are required" });
    }
    const data = await cartModel.findOne({ user, product });
    if (data) {
      data.qty += 1;
      await data.save();
      return res.status(201).json({
        success: true,
        message: "Cart Created..",
        cart: data,
      });
    }
    const cart = await cartModel.create({ user, product });
    return res
      .status(200)
      .json({ success: true, message: "Cart created successfully", cart });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
//GET ALL CART
export const getAllCart = async (req, res) => {
  try {
    const carts = await cartModel.find({});
    return res.status(201).json({
      success: true,
      message: "All Cart",
      carts: carts,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
//DELETE CART
export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findByIdAndDelete(id);
    return res.status(201).json({
      success: true,
      message: "cart removed successfully..",
      deletedCart: cart,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
