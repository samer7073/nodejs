const mongoose=require('mongoose');
const findVisible = require('./findVisible');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const commandeSchema=mongoose.Schema({
    qteC:{type:Number,required:true},
    dateC:{type:Date,required:true},
    client:{type:mongoose.Schema.Types.ObjectId,ref :"Client"},
    produit:{type:mongoose.Schema.Types.ObjectId, ref:"Produit"},
    isVisible :{type :Boolean,default : true}
})
/*
const population=[
    {path:'client',
    match:{isVisible:true}
},
    {path:'produit',
    match:{isVisible:true}
}
]
*/
/*
commandeSchema.pre('find',findVisible(population));
commandeSchema.pre('findOne',findVisible(population));
commandeSchema.pre('findOneAndUpadte',findVisible(population));
commandeSchema.pre('count',findVisible());
commandeSchema.pre('countDocuments',findVisible());
*/




commandeSchema.plugin(deepPopulate,{})
const Commande=mongoose.model('Commande',commandeSchema)
module.exports=Commande;