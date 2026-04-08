import { Router } from "express";
import { create, deleteProduct, getAllproduct, getOneproduct, updateProduct } from "../controllers/product.controller.js";

const productRouter=Router();

productRouter.post('/',create);
productRouter.get('/',getAllproduct);
productRouter.get('/:id',getOneproduct);
productRouter.delete('/:id',deleteProduct);
productRouter.patch('/:id',updateProduct);
export default productRouter;