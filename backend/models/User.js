const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tag: { type: String, required: true, unique: true },
  connects: {
    type: Array,
    default: [{
      _id: "66627549f498372a6290941b",
      name: "Level_up_bot_1",
      email: "level@level.level",
      password: "level",
      tag: "whatstag0",
      __v: 0,
    }],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
