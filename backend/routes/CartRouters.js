const routers = require("express").Router();
const User = require("../models/UserSchema");

routers.post("/addtocart/:userId", async (req, res) => {
    const{  bookId ,quantity} = req.body;
    console.log({ bookId, quantity });
    const { userId } = req.params;
    try{
        const user=await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const cartItem=user.cart.find((item)=> item.bookId.toString()===bookId.toString())
        if(cartItem){
            cartItem.quantity+=quantity
        }
        else{
            user.cart.push({bookId,quantity})
            await user.save()   
            return res.status(201).json({message:"Book added to cart successfully"})

        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
        
    
})