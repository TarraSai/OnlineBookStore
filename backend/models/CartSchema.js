const mongoose=require("mongoose");
const CartList=new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
        required:true,
    },
    Books:[
       {
        BookID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
            required:true,
        },
        quanity:{
            type:Number,
            required:true,
        },
        
       }

    ] ,
    createdAt:{
        type:Date,
        default:Date.now(),
    },
});
const Cart=mongoose.model("Cart",CartList);
module.exports=Cart;