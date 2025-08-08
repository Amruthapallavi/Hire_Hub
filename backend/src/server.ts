import express from "express";
import connectDB from "./config/db";

const app=express();


const PORT=8000;
app.listen(PORT,async()=>{
console.log(`server running on PORT ${PORT}`);
await connectDB();
})