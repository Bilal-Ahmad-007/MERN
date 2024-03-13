const { Timestamp } = require("mongodb")
const { default: mongoose } = require("mongoose")
const express=require("mongoose")

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, "please enter your name first"]
    
    },
    quantity: {
        type: Number,
        required: true,
        default:0
    },
    price :{
        type:Number,
        required:[true, "please enter price"]
        
        
    },
    image: {
        type: String,
        required: false,
    }
}, {Timestamp:true})

const Product=mongoose.model("Product",productSchema)

module.exports=Product;