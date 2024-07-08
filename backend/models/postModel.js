const mongoose=require('mongoose');
const User=require('./userModel')

const postModel=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    category:{
        type:String,
        enum:["Agriculture","Bussiness","Art","Education","Entertainment","Investment","Uncategories","Weather"],message:"value is not supported"
    },
    description:{
        type:String,
        require:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    thumbnail:{
        type:String,
        require:true
    }

},{timestamps:true})

module.exports=mongoose.model('Post',postModel);