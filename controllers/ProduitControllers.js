const Produit=require('../models/Produit');


exports.getproduit=(req,res)=>{
    Produit.find().then((data) => {
      
      res.json(data)
      })
      .catch((err) => {
        res.json({
          err: err,
          message: "Une erreur c'est produite",
        });
      });
  }


  exports.getproduitByID=(req,res,next)=>{
    //console.log("WEAREHEREINGET COMMAND BY ID")
    Produit.findOne({"_id": req.params._id,},function (err,data) {
      if (err) {
          err.status = 406;
          return next(err);
      }
     //console.log(data);
      return res.status(201).json(data)
    })
  }
  

  exports.Deleteprod=(req,res)=>{

 Produit.findOneAndDelete({ "_id": req.params._id},(err, doc) => {
      if (err) {
          console.log("Something wrong when DELETING data!");
      }
  
      console.log(doc);
      return res.status(201).json({
        message: ' Barquette DELETED '
    })
  });
  
  
  }


  exports.updateProduitSS=(req,res)=>{
    console.log("WE ARE UPDATING HORAIRE")
    const _id=req.params.id;
   const name=req.body.name;
   const prix=req.body.prix;
   const cathegorie=req.body.cathegorie;
   Produit.findByIdAndUpdate({_id:req.params._id},
    {
    name:req.body.name,
    prix:req.body.prix,
    cathegorie:req.body.cathegorie
  }
        ).then((data)=>{
   const noteup={_id,name,prix,disponible,cathegorie}
         res.json(noteup)
         console.log("UPDATE SUCCED",noteup)
   })
    // const goutToUpdate =  Gout.findById(noteId).then()
    // res.code(200).send({ data: goutToUpdate })
    
         .catch((err) => {
           console.log("UPDATE FAILED",err)
           res.json({
             err: err,
             message: "Une erreur c'est produite",
           });
         });
    
  }
  
