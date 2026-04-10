import mongoose from "mongoose"
import envConfig from "./envConfig.js";

const db=async()=>{
    try {
        await mongoose.connect(envConfig.MONGODB_URL);
        console.log('database Connected..')
    } catch (error) {
        console.log({error:error.message});
    }
}
export default db();