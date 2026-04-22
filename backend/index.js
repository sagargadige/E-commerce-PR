import express, { Router } from 'express'
import database from './configs/database.js';
import cartRouter from './routers/cart.route.js';
import categoryRouter from './routers/category.route.js';
import productRouter from './routers/product.route.js';
import userRouter from './routers/user.route.js';
import userAuth from './middlewares/userAuth.js';
import adminAuth from './middlewares/adminAuth.js';
import cors from 'cors';

const app=express();
const port=3200;
app.use(cors({
    origin:'http://localhost:5173',
    allowedHeaders:["Content-Type","Authorization"],
    methods:['GET','POST','DELETE','PATCH']
}))
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/category',userAuth,adminAuth,categoryRouter);
app.use('/api/cart',userAuth,cartRouter);


app.listen(port,(error)=>{
    if(error){
        console.log({error:error.message})
    }
    else{
        console.log('server start..')
        console.log('http://localhost:'+port);
    }
})