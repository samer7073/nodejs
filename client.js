const mongoose=require('mongoose');
const clientSchema=mongoose.Schema({
    cin:{type:Number,required:true},
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    adress:{type:String,required:true},
    email:{type:String,required:true},
   motPass:{type:String,required:true},
    isVisible :{type :Boolean,default : true}
})
const Client=mongoose.model('Client',clientSchema)
module.exports=Client;