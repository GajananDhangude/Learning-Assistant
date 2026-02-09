const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const ConnectDB = require('./config/db.js')
const cors = require("cors")
const path = require("path")
const fileURLToPath = require("url")
const AuthRoutes = require("./routes/auth.routes.js")


const app = express();
ConnectDB()

app.use(cors({
    origin:"*",
    methods:["GET" , "POST" , "PUT" , "DELETE"],
    allowedHeaders:["Content-Type" , "Authorization"],
    credentials:true
}))


app.use(express.json());
app.use(express.urlencoded({extended:true}))



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