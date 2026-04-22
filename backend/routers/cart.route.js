import { Router } from "express";
import { create, deleteCart, getAllCart } from "../controllers/cart.controller.js";

const cartRouter=Router();

cartRouter.post('/',create);
cartRouter.get('/',getAllCart);
cartRouter.delete('/:id',deleteCart);
export default cartRouter;