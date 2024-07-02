const Conversation = require("../models/Coversation.js");
const { getReceiverSocketId } = require("../socket/socket.js");

exports.addConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const exist = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (exist) {
      return res.status(200).json("Conversation already exists");
    }

    const newConversation = new Conversation({
      participants: [senderId, receiverId],
    });
    await newConversation.save();
    res.status(200).json("Conversation saved successfully");
  } catch (error) {
    console.error("Add conversation error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.addChatMessage = async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.params.id;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    conversation.messages.push(message);
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }
    res.status(200).json({ message: "Message added successfully" });
  } catch (error) {
    console.error("Add chat message error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChatMessages = async (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.params.id;

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (conversation) {
      res.status(200).json(conversation.messages);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.error("Get chat messages error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
