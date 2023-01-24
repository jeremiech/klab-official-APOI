const express=require('express')
const cors=require('cors')
const klabControler=require('./controller/EmployeeController')
const app=express()
const mongoose=require('mongoose')
require('dotenv/config')
mongoose.connect(process.env.DB).then(()=>{
    console.log('DB has connected successfully')
    app.use(express.json())
    app.use(cors())
    app.use(express.urlencoded({extended:false}))
    app.use('/klab',klabControler)
    const port=process.env.PORT
    app.listen(port,()=>console.log(`Server is listening PORT: ${port}`))

}).catch(err=>console.log('Some Err while connecting'+err.message))