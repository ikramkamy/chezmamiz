const express=require('express');
const multer = require('multer');
const router=express.Router();
const path=require('path');
const Produit=require('../models/Produit');
const {getproduit,getproduitByID,Deleteprod,updateProduitSS}=require('../controllers/ProduitControllers');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/uploads');
  },
     filename: function(req, file, cb) {
        cb(null, file.originalname);
      }
    });
    const fileFilter = (req, file, cb) => {
      // reject a file
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };  
  
  
const upload = multer({storage :storage,

  fileFilter: fileFilter,
});

router.post('/ajouter',upload.single('img'), (req, res,next) => {
    const prod = new Produit({
        name:req.body.name,
        quantite:req.body.quantite,
        prix:req.body.prix,
        dimmension:req.body.dimmension,
        cathegorie:req.body.cathegorie, 
       img: req.file.path
    });
    prod
      .save()
      .then(result => {
        console.log("responde frome posting an image",result);
        res.status(201).json({
          message: "Created product successfully",
          prod: {
              name: result.name,
              
              request: {
                  type: 'GET',
                  url: "http://localhost:3000/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.get('/getproduit',getproduit);
router.get('/getproduitByID/:_id',getproduitByID);
router.delete('/Deleteproduit/:_id',Deleteprod);
router.post('/updateProduitSS/:_id',updateProduitSS);

  module.exports = router;