import { Router } from "express";
import { create, deleteCategory, getAllCategory, getOneCategory, updateCategory } from "../controllers/category.controller.js";

const categoryRouter=Router();


categoryRouter.post('/',create);
categoryRouter.get('/',getAllCategory);
categoryRouter.get('/:id',getOneCategory);
categoryRouter.delete('/:id',deleteCategory);
categoryRouter.patch('/:id',updateCategory);
export default categoryRouter;