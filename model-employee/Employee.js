const mongoose=require('mongoose')
const Employee=new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    dob:{
        type:Date,
        required:true,
        default:Date.now()
    },
    profile:{
        data:Buffer,
        contentType:String
    }
})
module.exports=new mongoose.model('employee',Employee)