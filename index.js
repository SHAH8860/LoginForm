const express = require('express')
const app = express()
var cors = require('cors')
const userdata=require("./routs/user")
require('./connect')
var bodyParser = require('body-parser')
const port=process.env.PORT||8000
app.use(bodyParser.json())
app.use(cors())
app.use("/register",userdata)

app.listen(port,()=>{
    console.log(`COnnected on port${port}`)

})
