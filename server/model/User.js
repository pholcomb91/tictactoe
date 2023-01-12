

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema 
//const  Schema1 = require('./   ');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please use a valid email address!'],
    },
    password: {
      type: String,
      required: true,
    },
   
  },
  // This allows us to use a virtual
  {
    toJSON: {
      virtuals: true,
    },
  }
);



const User = model('User', userSchema);

module.exports = User;