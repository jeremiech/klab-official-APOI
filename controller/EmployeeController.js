const router=require('express').Router()
const Employee=require('../model-employee/Employee')
const fs=require('fs')
const Validation=require('../validation/EmployeeValidation')
const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploaded-img')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }

})
const upload=multer({storage:storage})


router.post('/add-new',upload.single('profile'),async(req,res)=>{
    const {error}=Validation.validate(req.body)
    if(error){
        res.status(501).send(error)
    }

    const employee=new Employee({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        // dob:req.body.dob,
        profile:{
            data:fs.readFileSync('uploaded-img/'+req.file.filename),
            contentType:'image/*'
        }


    })
    await employee.save().then(()=>{
        res.status(200).send("new Employee has Saved Successfully")
        
    }).catch(err=>res.status(500).send("Error while saving",err.message))



})

router.get('/list',async(req,res)=>{
    const list=await Employee.find()
    if(list!=null){
        res.json(list)
    }else{
        res.status(501).json('message',"List find no employee")
    }

})
router.get('/list/:id',async(req,res)=>{
    const id=req.params.id;
    const employee=await Employee.findOne({_id:id})
    if(employee!=null){
        res.json(employee)
    }else{
        res.status(501).json('message',"List find no employee")
    }
})

router.put('/edit/:id',upload.single('profile'),async(req,res)=>{
    const id=req.params.id
    const employee=await Employee.findByIdAndUpdate({_id:id},{$set:{
        profile:{
            data:fs.readFileSync('uploaded-img/'+req.file.filename),
            contentType:'image/*'
        }
        
    }})
    if(employee){
        res.send("Profile updated successful")
    }else{
        res.status(501).json("message",`an employee with ID${id} does not exists`)
    }
})





module.exports=router