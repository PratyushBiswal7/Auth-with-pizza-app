const express = require("express");

const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "Pong" });
});

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log("Server is running on http://localhost:" + ServerConfig.PORT);
});
