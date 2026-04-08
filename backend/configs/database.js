import mongoose from "mongoose"

const db=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/E-commerce');
        console.log('database Connected..')
    } catch (error) {
        console.log({error:error.message});
    }
}
export default db();