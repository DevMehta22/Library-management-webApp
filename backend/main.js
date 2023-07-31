require("dotenv").config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const router = require("./routes/BookRoutes")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use('/api/book',router)
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to DB")
    const port = process.env.PORT
    app.listen(port,(err)=>{
        if(err) throw err;
        console.log(`server is running on port ${port}`) 
    })

}).catch((err)=>{
    console.log(err)
})
