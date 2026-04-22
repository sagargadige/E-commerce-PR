import { Router } from "express";
import { create, deleteProduct, getAllproduct, getOneproduct, updateProduct } from "../controllers/product.controller.js";
import userAuth from "../middlewares/userAuth.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter=Router();

productRouter.post('/',userAuth,adminAuth,create);
productRouter.get('/',getAllproduct);
productRouter.get('/:id',getOneproduct);
productRouter.delete('/:id',userAuth,adminAuth,deleteProduct);
productRouter.patch('/:id',userAuth,adminAuth,updateProduct);
export default productRouter;