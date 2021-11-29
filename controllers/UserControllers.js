const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = (req, res) => {
    const email=req.body.email
    User.findOne({ email: email }).exec(async (error, user) => {
      if (user)
        return res.status(400).json({
         error: "User already registered",
        });
  
  const { firstName,password, lastName, email,phone} = req.body;
  const salt = await bcrypt.genSalt(10);
  const  hash_password=  await bcrypt.hashSync( req.body.password, salt);

      const myuser = new User({
        firstName,
        lastName,
        email,
        phone,
        hash_password,
        
      });
  
      myuser.save((error, user) => {
        if (error) {
        console.log("l'erraur est dans le coté serveur",error)
         // return console.log("somenthing is rong",error)
          return res.status(400).json({ 
            error:error,
            message: "Something went wrong",
           
          });
           
        }
  
        if (user) {
          const token = generateJwtToken(user._id, user.role);
          const { _id, firstName, lastName, email, role,phone } = user;
          return res.status(201).json({
            token,
            user: { _id, firstName, lastName, email, role,phone },
          });
        }
      });
    });



  }


  exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const isPassword = await user.authenticate(req.body.password);
       
        if (isPassword && user.role === "user") {
          // const token = jwt.sign(
          //   { _id: user._id, role: user.role },
          //   process.env.JWT_SECRET,
          //   { expiresIn: "1d" }
          // );
          const token = generateJwtToken(user._id, user.role);
          const { _id, firstName, lastName, email,phone } = user;
          res.status(200).json({
            token,
            user: { _id, firstName, lastName, email,phone },
          });
        } else {
          return res.status(400).json({
            message: "Pssword incorrect",
          });
        }
      } else {
        return res.status(400).json({ 
          
          message: "Something went wrong" 
        });
      }
    });
  };



  exports.Delete=(req,res)=>{

    User.findOneAndDelete({ "_id": req.params._id},(err, doc) => {
      if (err) {
          //console.log("Something wrong when DELETING data!");
      }
  
      console.log(doc);
      return res.status(201).json({
        message: ' user DELETED '
    })
  });
  
  }


  exports.getallusers=(req,res)=>{
    User.find().then((data) => {
    res.json(data)
    })
    .catch((err) => {
      res.json({
        err: err,
        message: "une erreur c'est produite",
      });
    });
}

exports.getuserbyid=(req,res)=>{
User.find({_id:req.params._id}).then((data)=>{
res.json(data);
}).catch((err)=>{
  console.log("error",err)
res.json({
  err:err,
  message:"nous n'avons pas pu trouver l'utilisateur"
})
})
}