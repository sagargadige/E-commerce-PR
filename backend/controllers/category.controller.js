import categoryModel from "../models/category.model.js";

//CREATE Category
export const create = async (req, res) => {
  try {
    const category = await categoryModel.create(req.body);
    return res.status(201).json({
        success:true,
        message:"Catergory Created.",
        category:category
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message,
        category:null
    })
  }
};

//GET ONE Category
export const getOneCategory = async(req,res)=>{
    try {
        const {id}=req.params
        const category = await categoryModel.findById(id);
        if(category){
            return res.status(201).json({
            success:true,
            message:"One Category",
            info:category
        })
        }else{
            return res.status(201).json({
            success:false,
            message:"Category Not Found :(",
            info:category
        })
        }
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:error.message,
        category:null
    })
    }
}
//GET All Category
export const getAllCategory = async(req,res)=>{
    try {
        const categorys = await categoryModel.find({});
        return res.status(201).json({
            success:true,
            message:"All Category",
            info:categorys
        })
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:error.message,
        category:null
    })
    }
}
//Delete Category
export const deleteCategory = async(req,res)=>{
    try {
        const {id}=req.params
        const category = await categoryModel.findByIdAndDelete(id);
        if(category){
            return res.status(201).json({
            success:true,
            message:"Category Deleted..",
            info:category
        })
        }else{
            return res.status(201).json({
            success:false,
            message:"Category Not Found :(",
            info:category
        })
        }
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:error.message,
        category:null
    })
    }
}
//Update Category
export const updateCategory = async(req,res)=>{
    try {
        const {id}=req.params
        const category = await categoryModel.findByIdAndUpdate(id,req.body);
        if(category){
            return res.status(201).json({
            success:true,
            message:"Category Updated..",
            info:category
        })
        }else{
            return res.status(201).json({
            success:false,
            message:"Category Not Found :(",
            info:category
        })
        }
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:error.message,
        category:null
    })
    }
}

