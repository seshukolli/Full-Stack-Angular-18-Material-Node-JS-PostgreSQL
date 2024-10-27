//constants or module

const express= require("express")
const app = express()
const cors = require("cors")
const port= process.env.port || 3005
const bodyParser = require("body-parser")
//create node js server
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

const controller=require("./controller/controller")
app.use(controller)
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port: ${port}`);
})


