const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt= require('jsonwebtoken');
const CommandeSchema = new mongoose.Schema(
  {
      cart:{
          type:Array,
          default:[],
      },
      user:{
         type:Array,
         default:[],
      }
  } 
);



const Commande=mongoose.model('commande', CommandeSchema);
module.exports=Commande;