import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).send({ message: "user existed" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });
  await newUser.save();
  return res.status(200).send({ status: true, message: "user recorded" });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "user not found " });
    
  }
  const validpassword = await bcrypt.compare(password, user.password);
  if (!validpassword) {
    return res.json({ message: "password incorect" });
  }
  const token = jwt.sign({ username: user.username }, "jwttokenkey", {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "login successfully" });
});

router.post("/forgot-Password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not found" });
    }

    
    const token = jwt.sign({ id: user._id}, "jwttokenkey", {
        expiresIn: "5m",
      });
      var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: "bilalahmad2003170@gmail.com",
              pass: "dtby cafc mgio fjya",
            },
        });
        
    var mailOptions = {
      from: "bilalahmad2003170@gmail.com",
      to: email,
      subject: "Reset password-",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.json({message: "error sending email "})
            
        } else {
           
            return res.json({status: true ,message: "email send"})
        }
    });
} catch (err) {
    console.log(err);
  }
});

router.post('/reset-password/:token', async (req,res)=>{
const {token} =req.params;
const {password} =req.body
try{
    const decoded = await jwt.verify(token,'jwttokenkey');
    const id= decoded.id;
    const hashpassword= await bcrypt.hash(password,10)
    await  User.findByIdAndUpdate({_id: id}, {password:hashpassword});
    return res.json({status:true ,message:"updated record password"})

}catch(err){
   return res.json("invalid token")

}
})
const varifyUser=async (req,res,next)=>{
  
  try{
  const token= req.cookies.token;
  if(!token){
    return res.json({status:false, message:"no token"})
  }
  const decoded =await jwt.verify(token,'jwttokenkey');
  next()

  }catch(err){
   return res.json(err)
  }
};

router.get('/verify', varifyUser, (req,res)=>{
  return res.json({status: true, message:"autherize"})

})


export { router as UserRouter };
