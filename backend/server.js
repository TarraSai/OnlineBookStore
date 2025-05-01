const express=require('express');
const app=express();
require('dotenv').config();
const port = process.env.PORT || 3000;
 const database=require('./Database/connection.js');
 const UserRouters = require("./routes/UserRouters.js");
 const AdminRouters = require("./routes/AminRouters.js");
 //database connection
 database();
 //routes
app.use(express.json());
app.use('/api/user',UserRouters);
app.use('/api/admin',AdminRouters);

app.listen(port,()=>{
    console.log(`Server is running on port  ${port}`);
})