const User = require("../models/User.js");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const count = await User.countDocuments();
  const tag = `whatstag${count + 1}`;

  try {
    const user = new User({ name, email, password, tag });
    await user.save();
    res.status(200).send("Signup successful");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.searchUser = async (req, res) => {
  const { searchTag,id } = req.body;
  try {
    const user = await User.findOne({
      $or: [
        { tag: searchTag },
        { _id: id }
      ]
    });
    
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({});
    }
  } catch (error) {
    console.error("Search user error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateConnects = async (req, res) => {
  const { tag, additions } = req.body;
  try {
    const user = await User.findOne({ tag });
    if (user) {
      user.connects = additions;
      await user.save();
      res.status(200).send(user);
    } else {
      res.status(404).send({});
    }
  } catch (error) {
    console.error("Update connects error:", error);
    res.status(500).send("Internal Server Error");
  }
};
