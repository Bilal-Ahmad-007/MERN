// const fs= require ("fs");
// const path=require("path");
// const http=require("http")
// const DirPath= path.join(__dirname,"root")
// const data=require("./data")
// console.log(DirPath);

// fs.writeFileSync(`${DirPath}/note.txt`,"ffirst text file")
// fs.readFile(`${DirPath}/note.txt`,`utf-8`,(err,item)=>{
//     console.log(item)
// })
// fs.appendFile(`${DirPath}/note.txt`," root file use to test",(err,item)=>{
//     if(!err){
//         console.log("successfully done")
//     }
// })
// fs.rename(`${DirPath}/note.txt`,`${DirPath}/fruit.txt`,(err,item)=>{
//         if(!err){
//             console.log("successfully done")
//         }})
// fs.unlinkSync(`${DirPath}/fruit.txt`)
// const PORT=7000;
// http.createServer((req,res)=>{

//     // res.write(`this is server practice ${PORT}`);
//     // res.end();
// res.writeHead(200,{"Content-type": "AplicationJSON"});
// res.write(JSON.stringify(data)
// )
// res.end()
// }

// ).listen(PORT)


// const express=require('express');
// const app=express();
// const DBURL="mongodb+srv://bilalahmad:admin@cluster0.3g7nnwd.mongodb.net/?retryWrites=true&w=majority"


// app.use(express.json());

// app.get("/",(req,res)=>{
//     res.send("heelo home")
// })
// app.get("/about",(req,res)=>{
//     res.send("heelo about")
// })
// app.post("/user",(req,res)=>{
//     console.log(req.body);
//     res.send("heelo user");
// })


// app.listen(7000,()=>{
//     console.log("hlo");
// })

// const mongose=require("mongoose");
// mongose.connect(DBURL)
// .then((res)=>{
//     console.log(res,"res");
// })
// .catch((err)=>{
//     console.log(err,"error find");
// });




// /////////////////////////////////crud in moongodb/////////////////////////////////////////////


const express= require("express")
const mongoose=require("mongoose")
const Product=require("./models/productModel")

const app=express()

////////////////midle wares////////////////
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// routes
app.get("/",(req,res)=>{
    res.send('helo express')
}
)

//////////////////////////// get a single collection by using //////// 
app.get("/product/:id", async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({messge:error.message})
    }
})
 
// /////////////////////get all collection present in mongo db/////////////////

app.get("/product", async(req,res)=>{
    try {
        const product=await Product.find({})
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({messge:error.message})
    }
})

// //////////////update value in mongodb collection///////////////////


app.put("/product/:id", async(req,res)=>{
    try {
        const {id}= req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:`cannot find product at ${id}`})

        }
        const updatedProduct=await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({messge:error.message})
        console.log(error.message);
    }
})



// /////////////////delete a single collection in mongo bd/////////////


app.delete("/product/:id", async(req,res)=>{
    try {
        const {id}= req.params;
        const product=await Product.findByIdAndDelete(id,req.body);
        if(!product){
            return res.status(404).json({message:`cannot find product at ${id}`})

        }
        const updatedProduct=await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({messge:error.message})
        console.log(error.message);
    }
})

// /////////////dalete all collection in mongo db/////////////


app.delete("/product", async(req,res)=>{
    try {
        const deletedProducts = await Product.deleteMany();
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({messge:error.message})
        console.log(error.message);
    }
})



// //// create mongo db collection////////////


app.post("/product", async(req,res)=>{
    try {
        const product=await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({messge:error.message})
    }
})

// ///////////////////mongodb connection & server connection ////////////////////


mongoose.connect("mongodb://127.0.0.1:27017/node-api")
.then(()=>{
    console.log('mongodb connected')

    app.listen(3000,()=>{
        console.log("server is connected")
    })

}).catch(err=>{
    console.log(err)
})