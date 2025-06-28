import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    photo:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    creditBal:{
        type:Number,
        default:5,
    }
})

const userModel=mongoose.model("users",userSchema)

export default userModel