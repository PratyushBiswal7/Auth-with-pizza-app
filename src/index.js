const express = require("express");

const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRouter");
// const User = require("./schemas/userSchema");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/carts", cartRouter);

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "Pong" });
});

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log("Server is running on http://localhost:" + ServerConfig.PORT);

  /*const newUser = await User.create({
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    email: "john.doe@example.com",
    password: "password123",
  });

  console.log("New User Data:", newUser);*/
});
