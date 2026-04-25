import dotenv from 'dotenv';
dotenv.config();

const envConfig ={
    MONGODB_URL:process.env.MONGODB_URL,
    SECRET_KEY:process.env.SECRET_KEY,
    PORT:3200
}
export default envConfig;