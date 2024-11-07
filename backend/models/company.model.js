import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String, 
    },
    website:{    
        type:String 
    },
    location:{
        type:String   
    },
    logo:{
        type:String // URL to company logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', 
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'verified', 'rejected'],
        default:'pending'
    } 
},{timestamps:true}) 
export const Company = mongoose.model("Company", companySchema); 