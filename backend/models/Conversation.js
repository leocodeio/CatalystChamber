const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: { type: [String], required: true },
  messages: { type: [String], default: [] },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
