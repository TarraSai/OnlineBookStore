const mongoose=require("mongoose")
const OrderSchema=new mongoose.Schema({
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
            quantity:{
                type:Number,
                required:true,
            },
            
            

        }
    ],
    totalPrice:{
        type:Number,
        required:true,
    },
    Status:{
        type:String,
        enum:["pending","shipped","delivered"],
        default:"pending",
    },
},{
    timestamps:true,
})
const Order=mongoose.model("Order",OrderSchema)
module.exports=Order