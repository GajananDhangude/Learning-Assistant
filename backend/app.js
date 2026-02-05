const express = require("express")
const dotenv = require('dotenv')
dotenv.config();
const ConnectDb = require("./config/db.js")
const cors = require('cors')
const path = require('path')
const {fileURLToPath}  = require('url')


const app = express();
ConnectDb()
app.use(cors())


app.get("/" , (req , res) =>{
    res.send("Hello World")
})


app.listen(8080 , () =>{
    console.log("Server is listning to the port 8080")
})