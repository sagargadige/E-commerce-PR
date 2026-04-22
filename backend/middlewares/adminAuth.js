const adminAuth=(req,res,next)=>{
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        return res.status(403).json({
            success:false,
            message:'Access Denied. only Admin'
        })
    }
}
export default adminAuth;