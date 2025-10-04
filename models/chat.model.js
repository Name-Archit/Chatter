const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from: { 
      type: String, 
      trim: true, 
      required: true,
      lowercase: true
     },

    to: { 
      type: String, 
      trim: true, 
      required: true,
      lowercase: true
     },

    text: { 
      type: String, 
      required: true
     },

    timestamp: { 
      type: Date, 
      default: Date.now
     }
});

const chatModel =  mongoose.model('Chat', chatSchema);
module.exports = chatModel;
