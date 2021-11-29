const express= require('express');
const mongoose =require('mongoose');
const db=require('./config/db');
const userRoutes=require('./routes/UserRoutes');
const produitsRoutes=require('./routes/ProduitsRoutes');
const commandeRoutes=require('./routes/CommandeRoutes');
const app=express();
const env=require('dotenv');
const bodyParser = require("body-parser");
//invid et tineye les logiciel pour chercher des images et des vidéos
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(userRoutes);
app.use(produitsRoutes);
app.use(commandeRoutes);
env.config();
app.listen(3001,()=>console.log("serveur express a démarer 3001")) 
