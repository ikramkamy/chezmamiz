const express=require('express');
const router=express.Router();
const {signup,signin,Delete,getallusers,getuserbyid}=require('../controllers/UserControllers');

router.post('/signup',signup);
router.post('/signin',signin);
router.delete('/delete/:_id',Delete)
router.get('/getallusers',getallusers);
router.get('/getuserbyid/:_id',getuserbyid);





module.exports=router;