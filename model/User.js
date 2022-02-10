const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, "Please enter username"],
    lowercase: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "Please Enter First Name"],
  },
  lastname: {
    type: String,
    alias: 'surname',
    required: [true, "Please Enter Last Name"],
  },
  password:{
    type: String,
    required: [true, "Please Enter Password"],
  }, 
    createon: {
    type: Date,
    default: Date.now
  }
})

//Create model
const User = mongoose.model("User", UserSchema);
module.exports = User;