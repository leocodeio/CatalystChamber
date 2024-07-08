const mongoose = require('mongoose');
date = new Date();
const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: date.toISOString() },
});

const conversationSchema = new mongoose.Schema({
  participants: { type: [String], required: true },
  messages: { type: [messageSchema], default: [] },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
