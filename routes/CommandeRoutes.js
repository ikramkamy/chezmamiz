const express=require('express');
const router=express.Router();



const {addcommande,getallcommands,deletecommande}=require("../controllers/CommandeControllers");
router.post('/ajouter-une-commande',addcommande);
router.get('/afficher-les-commandes',getallcommands);
router.delete('/supprimer-la-commande/:_id',deletecommande);

module.exports=router;
