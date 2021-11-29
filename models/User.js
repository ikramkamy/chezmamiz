const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt= require('jsonwebtoken');
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
   password: {
      type:String,
    },
    phone: {
     type:Number,
     required: true,
    },
    role:{
        type:String,
        default:"user",
    }
    
  },
  { timestamps: true }
);


userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
//cette méthode a pour but de crypté le mot de pass logiquement on aura besoin des deux 

{/*userSchema.virtual("password").set(function(password){
this.hash_password=bcrypt.hashSync(password);
})*/}

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};
/*-------------------------La creation du Token------------------------------*/ 
                      //cette methode est n'est pas appliquée//
userSchema.methods.createToken = async function(){
try{
let payload={
  username: this.username,
  role: this.role,
};

let token = await jwt.sign(payload,'thissecret');

return token;
} catch (error){
  return error;
}
};
/*---------------------------------------------------------------------------*/ 

userSchema.methodes={
  verifyPassword: async function (password){
    return await bcrypt.compare(password, this.hash_password);
  }
  
}
const User=mongoose.model('user',userSchema);
module.exports=User;