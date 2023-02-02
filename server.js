const express=require('express');
var cors = require('cors')
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Client = require('./Client');
const Produit = require('./produit');
const Commande=require('./commande');
const Admin = require('./admin');
const nodemailer = require("nodemailer");



const app=express()



app.use(cors({
    origin:"http://localhost:4200"
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/getProduit',async(req,res)=>{
    try{
        await Produit.find({}).then(result=>{
            res.send(result)
        })

    }catch(err){
        res.send(err)
    }
})

/*
app.get('/getProduitOne/:id',async(req,res)=>{
    try{
        await Produit.findById(req.params.id)
        .then(result=>{res.send(result) })

    }catch(err){
        res.send(err)
    }
})
*/
app.get('/getProduit/:id',async(req,res) =>{
    
    let id =req.params.id;
    id=id.toString();

    await Produit.findById(id)
    .then((produit)=>res.send(produit) )
    
})




app.post('/postProduit',async(req,res)=>{
    try{
        let new_produit=new Produit ({
            libProduit:req.body.libProduit,
            qteProduit:req.body.qteProduit,
            photo:req.body.photo,
            desc:req.body.desc,
            prix:req.body.prix


          
        })
        await new_produit.save();
        res.send('Ajouter Avec Succes')


    }catch(err){
        console.log(err)
    }
})


app.delete('/deleteProduit/:id',async(req,res)=>{
    let id =req.params.id;
    id=id.toString();

    await Produit.findByIdAndDelete(id)
    .then((client)=>res.send(client) )
    /*
    try{
        await Produit.findOneAndDelete({id:req.params.id});
        res.send("supprimer avec succes !!!!!!!!!")


    }catch(err){
        res.send(err);
    }
    */
})


app.put('/majProduit/:id',async(req,res)=>{
    try{
        await Produit.findOneAndUpdate({_id:req.params.id},{libProduit:req.body.libProduit,qteProduit:req.body.qteProduit,photo:req.body.photo,desc:req.body.desc,prix:req.body.prix});
        res.send("mise ajour avec succes");

    }catch(err){
        res.send(err)
    }
})

app.put('/majProduitStock/:id',async(req,res)=>{
    try{
        await Produit.findOneAndUpdate({_id:req.params.id},{qteProduit:req.body.qteProduit});
        res.send("mise ajour avec succes");

    }catch(err){
        res.send(err)
    }
})











app.get('/getClinet',async(req,res)=>{
    try{
        await Client.find({}).then(result=>{
            res.send(result)
        })

    }catch(err){
        console.log(err)
    }
})

app.get('/getClient/:id',async(req,res) =>{
    
    let id =req.params.id;
    id=id.toString();
   

    await Client.findById(id)
    .then((client)=>res.send(client) )
    
})


app.post('/postClient',async(req,res)=>{
    try{
        let new_client=new Client ({
            cin:req.body.cin,
            nom:req.body.nom,
            prenom:req.body.prenom,
            adress:req.body.adress,
            email:req.body.email,
            motPass:req.body.motPass
        })
        await new_client.save();
        res.send('Ajouter Avec Succes')


    }catch(err){
        console.log(err)
    }
})
app.delete('/deleteClinet/:id',async(req,res)=>{
    let id =req.params.id;
    id=id.toString();

    await Client.findByIdAndDelete(id)
    .then((client)=>res.send(client) )

    /*
    try{
        let id =req.params.id;
        id=id.toString();
        await Client.findByIdAndDelete({id});
        res.send("supprimer avec succes !!!!!!!!!")


    }catch(err){
        res.send(err);
    }
    */
})
app.put('/majClient/:id',async(req,res)=>{
    try{
        await Client.findOneAndUpdate({_id:req.params.id},{nom:req.body.nom,cin:req.body.cin,prenom:req.body.prenom,adress:req.body.adress,email:req.body.email,motPass:req.body.motPass});
        res.send("mise ajour avec succes");

    }catch(err){
        res.send(err)
    }
})






app.post('/postCommande',async(req,res)=>{
    try{
        let new_Commande=new Commande ({
            qteC:req.body.qteC,
            dateC:req.body.dateC,
            client:req.body.client,
            produit:req.body.produit

  
        })
        await new_Commande.save();
        res.send('Ajouter Avec Succes')


    }catch(err){
        console.log(err)
    }
})


app.delete('/deleteCommande/:id',async(req,res)=>{
    let id =req.params.id;
    id=id.toString();

    await Commande.findByIdAndDelete(id)
    .then((client)=>res.send(client) )


    /*
    try{
        await Commande.findOneAndDelete({id:req.params.id});
        res.send("supprimer avec succes !!!!!!!!!")


    }catch(err){
        res.send(err);
        
    }
    */
})




app.put('/majCommande/:id',async(req,res)=>{
    try{
        await Commande.findOneAndUpdate({_id:req.params.id},{qteC:req.body.qteC});
        res.send("mise ajour avec succes");

    }catch(err){
        res.send(err)
    }
})

app.get('/getCommande',async(req,res)=>{
    try{
        await Commande.find({}).populate("client").populate("produit").exec().then(result=>{
            res.send(result)
        })

    }catch(err){
        console.log(err)
    }
})


app.get('/getAdmin',async(req,res)=>{
    try{
        await Admin.find({}).then(result=>{
            res.send(result)
        })

    }catch(err){
        console.log(err)
    }
})


app.post('/postAdmin',async(req,res)=>{
    try{
        let new_admin=new Admin ({
            nom:req.body.nom,
            motPass:req.body.motPass
        })
        await new_admin.save();
        res.send('Ajouter Avec Succes')


    }catch(err){
        console.log(err)
    }
})

/*
let mailTransporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"cmandiny8@gmail.com",
        pass:"29334244"
    }
})

let details={
    from:"cmandiny8@gmail.com",
    to:"samerarfaoui2@gmail.com",
    subject:"testing our nodemailer",
    text:"testing out first sender"
}
mailTransporter.sendMail(details,(err)=>{
    if(err){
        console.log("il ya erreur",err)
    }else{
        console.log("email envoyee avec succes ")
    }
})

*/

// create reusable transporter object using the default SMTP transport


/*

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'samerarfaoui2@gmail.com', // generated ethereal user
        pass: 'hjzmxstaaypqsowf'  // generated ethereal password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'samerarfaoui2@gmail.com', // sender address
    to: 'samerarfaoui2@gmail.com', // list of receivers
    subject: 'first email test ✔', // Subject line
    text: 'dsgfergergerger ertthtrehrthr rthrthrt fhtr gfhrt rth ?', // plain text body
  //  html: '<b>Hello samer?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

*/







async function sendEmail(to, subject, html) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'samerarfaoui2@gmail.com',
        pass: 'hjzmxstaaypqsowf'
      }
    });
    
    let info = await transporter.sendMail({
      from: 'samerarfaoui2@gmail.com',
      to,
      subject,
      html
    });
    
    console.log('Message sent: %s', info.messageId);
}




app.post('/api/sendemail', (req, res) => {
    sendEmail(req.body.to,req.body.subject,req.body.html); // call the sendEmail function defined earlier
    res.send({ message: 'Email sent' });
});
  














mongoose.connect('',(err,done)=>{
    if(err){
        console.log(err);
    }
    if(done){
        console.log('base de donnes connectes avec succes');
    }
})

app.listen(5000,()=>console.log("serveur en marche"))
//mongodb+srv://samer:<password>@cluster0.worqjvy.mongodb.net/?retryWrites=true&w=majority