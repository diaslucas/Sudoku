const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
//     validate: {
//       isAsync: true,
//       validator: function(value, isValid) {
//           const self = this;
//           return self.constructor.findOne({ username: value })
//           .exec(function(err, user){
//               if(err){
//                   throw err;
//               }
//               else if(user) {
//                   if(self.id === user.id) { 
//                       return isValid(true);
//                   }
//                   return isValid(false);  
//               }
//               else {
//                   return isValid(true);
//               }

//           })
//       },
//       message:  'The username already exists!'
//   },
  },
  password: {
    type: String,
    required: true
  },
  insertDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);