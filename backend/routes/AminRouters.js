const routers=require('express').Router();
const Book=require('../models/BookSchema');
const {tokenverify, verifyAdmin} = require("../middleware/Tokengen");
routers.post('/addbook', tokenverify , verifyAdmin,async(req,res)=>{
   
    const {title,author,description,image,price,category,stock}=req.body;
    try{
        if(!title || !author || !description || !image || !price || !category || !stock){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const NewBook=await Book.create({
            title,
            author,
            description,
            image,
            price,
            category,
            stock
        })
        await NewBook.save()
        return res.status(201).json({message:"Book created successfully"})
    }
    catch(err){
        return res.status(500).json({message:"Error creating book"})
    }


})
routers.put('/updatebook/:id', tokenverify , verifyAdmin,async(req,res)=>{
    const {title,author,description,image,price,category,stock}=req.body;
    const {id}=req.params;
    try{
        if(!title || !author || !description || !image || !price || !category || !stock){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const updatedBook=await Book.findByIdAndUpdate(id,{
            title,
            author,
            description,
            image,
            price,
            category,
            stock
        },{new:true})
        if(!updatedBook){
            return res.status(404).json({message:"Book not found"})
        }
        return res.status(200).json({message:"Book updated successfully",updatedBook})
    }
    catch(err){
        return res.status(500).json({message:"Error updating book"})
    }


})
routers.delete('/deletebook/:id', tokenverify , verifyAdmin,async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedBook=await Book.findByIdAndDelete(id)
        if(!deletedBook){
            return res.status(404).json({message:"Book not found"})
        }
        return res.status(200).json({message:"Book deleted successfully"})
    }
    catch(err){
        return res.status(500).json({message:"Error deleting book"})
    }


})
routers.get('/getallbooks',async(req,res)=>{
    try{
        const books=await Book.find()
        if(!books){
            return res.status(404).json({message:"No books found"})
        }
        return res.status(200).json({books})
    }
    catch(err){
        return res.status(500).json({message:"Error fetching books"})
    }


})
routers.get('/getbook/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const book=await Book.findById(id)
        if(!book){
            return res.status(404).json({message:"Book not found"})
        }       
        return res.status(200).json({book})
    }   
    catch(err){
        return res.status(500).json({message:"Error fetching book"})
    }
})

module.exports=routers;