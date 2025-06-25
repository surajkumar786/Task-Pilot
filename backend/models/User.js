const mongoose =require('mongoose');

const UserSchema=new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  profileImageUrl:{
    type:String,
    default:null
  },
  role:{
    type: String,
    enum: ['admin', 'member'],
    default: 'member',
  },// Role can be 'admin' or 'member' or roll based access
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
// This code defines a Mongoose schema for a User model in a Node.js application.