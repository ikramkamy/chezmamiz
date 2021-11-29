const Commande=require('../models/Commande');
const mongoose=require('mongoose');
exports.addcommande =( req,res)=>{
    const {cart ,user} = req.body;
    
    const mycommand = new  Commande({
    cart,
    user,
   
    });

    mycommand.save((error, mycommand) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
  
        if (mycommand) {
         
          const { cart,user} = mycommand;
    
      
          return res.status(201).json(mycommand);
        }
      });


}

exports.getallcommands  =(req,res)=>{

Commande.find().then((data) => {
  res.json(data)
  })
  .catch((err) => {
    res.json({
      err: err,
      message: "Une erreur c'est produite",
    });
  });


}

exports.deletecommande =(req,res)=>{
Commande.findOneAndDelete({"_id": req.params._id}, (err, doc) => {
    console.log("we find it and know we are deleting")
    if (err) {
        console.log("Something wrong when updating data!");
        
    }

    console.log(doc);
    return res.status(201).json({
      message: ' CART DELETED '
  })
});

}