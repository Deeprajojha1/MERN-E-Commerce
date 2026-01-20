import mongoose from "mongoose";

// Address Schema
const addressSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullname:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    pincode:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
});

export const Address=mongoose.model('Address',addressSchema);