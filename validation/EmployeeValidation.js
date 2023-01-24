const Joi=require('joi')
const Schema=Joi.object({
    fname:Joi.string().alphanum().min(4).max(15).required(),
    lname:Joi.string().alphanum().min(4).max(15).required(),
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}})

})

module.exports=Schema