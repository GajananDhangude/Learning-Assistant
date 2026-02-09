const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const ConnectDB = require('./config/db.js')
const cors = require("cors")
const cookieParser = require("cookie-parser");
const path = require("path")


const AuthRoutes = require("./routes/auth.routes.js");



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
ConnectDB();



// const corsOptions = {
//     origin:"*",
//     credentials:true
// }

// app.use(cors(corsOptions))




app.get("/" , (req , res) =>{
    res.send("Hello World")
});

app.use("/api" , AuthRoutes);




app.use((req , res) =>{
    res.status(404).json({
        success:false,
        error:"Route not found",
        statusCode:404
    });
});


app.listen(8080 , () =>{
    console.log("Server is listning to the port 8080")
})