const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    match: [/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number']
  },
  profilePicture: String,
  registeredAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
