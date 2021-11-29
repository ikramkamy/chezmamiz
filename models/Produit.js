
const mongoose = require("mongoose");

const ProduitSchema = new mongoose.Schema(
  {
    name:{
          type:String,
     },
     pnam:{
            type:String,
     },
     cathegorie:{
        type:String,
      },
      prix:{
         type:Number,
         
      },quantite:{
        type:Number,
      },
      description:{
        type:String,  
      },
      img:{
        type:String,   
      }

  } 
);



const Produit=mongoose.model('produit', ProduitSchema);
module.exports=Produit;
