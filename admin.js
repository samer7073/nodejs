const mongoose=require('mongoose');
const adminSchema=mongoose.Schema({
    nom:{type:String,required:true},
    motPass:{type:String,required:true},
    isVisible :{type :Boolean,default : true}
})
const Admin=mongoose.model('Admin',adminSchema)
module.exports=Admin;