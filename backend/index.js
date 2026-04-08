import express, { Router } from 'express'
import database from './configs/database.js';
import router from './routers/user.route.js';
import cartRouter from './routers/cart.route.js';
import categoryRouter from './routers/category.route.js';
import productRouter from './routers/product.route.js';
const app=express();
const port=3200;
app.use(express.json());

app.use('/api',router);
app.use('/api/cart',cartRouter);
app.use('/api/category',categoryRouter);
app.use('/api/product',productRouter);


app.listen(port,(error)=>{
    if(error){
        console.log({error:error.message})
    }
    else{
        console.log('server start..')
        console.log('http://localhost:'+port);
    }
})