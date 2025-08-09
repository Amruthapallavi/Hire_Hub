import express, { urlencoded } from "express";
import connectDB from "./config/db";
import cors from 'cors'
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes";
dotenv.config();


const app=express();

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(
    cors({
       origin:process.env.FRONTEND_URL,
       credentials:true,
    })
);


app.use('/user',userRoutes);

const PORT=process.env.PORT;
app.listen(PORT,async()=>{
console.log(`server running on PORT ${PORT}`);

await connectDB();
})