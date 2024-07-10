const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/userRoutes.js");
const conversationRoutes = require("./routes/conversationRoutes.js");

const { app, server } = require("./socket/socket.js");
const port = 3001;

// for file uploads
const multer = require('multer');
const upload = multer({ dest: "uploads" });

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/conversations", conversationRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
