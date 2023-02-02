const mongoose=require('mongoose')
const produitSchema=mongoose.Schema({
    libProduit:{type:String , required:true },
    qteProduit:{type:Number , required:true },
    photo:{type:String ,required:true},
    desc:{type:String,required:true},
    prix:{type:Number , required:true},
    isVisible :{type :Boolean,default : true}


})
const Produit=mongoose.model('Produit',produitSchema)
module.exports=Produit;