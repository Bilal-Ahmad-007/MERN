import express  from "express";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import cors from 'cors'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


const PORT=3000;

const app = express();
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],    
    credentials: true,
  }));
  
app.use('/auth', UserRouter)

mongoose.connect('mongodb://127.0.0.1:27017/authentication')

app.listen(PORT,()=>{
    console.log("server is runing ")
})