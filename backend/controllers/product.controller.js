import productModel from "../models/product.model.js";

//CREATE PRODUCT
export const create = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Product Created..",
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      product: null,
    });
  }
};

//GET ALL PRODUCTS
export const getAllproduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.status(201).json({
      success: true,
      message: "All Product..",
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      products: null,
    });
  }
};

//GET One PRODUCT
export const getOneproduct = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await productModel.findById(id);
    if (product) {
      return res.status(201).json({
        success: true,
        message: "One Product Details..",
        product: product,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Product NOT Found..",
        product: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      product: null,
    });
  }
};

//Delete PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const {id}=req.params
    const product = await productModel.findByIdAndDelete(id);
    if (product) {
      return res.status(201).json({
        success: true,
        message: "Product Deleted..",
        product: product,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Product NOT Found..",
        product: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      product: null,
    });
  }
};

//Update PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const {id}=req.params
    const product = await productModel.findByIdAndUpdate(id,req.body);
    if (product) {
      return res.status(201).json({
        success: true,
        message: "Product Updated..",
        product: product,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Product NOT Found..",
        product: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      product: null,
    });
  }
};
