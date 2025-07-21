const express = require("express");
const cookieParser = require("cookie-parser");
const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRouter");
const authRouter = require("./routes/authRouter");
const { isLoggedIn } = require("./Validators/authValidator");
const uploader = require("./middlewares/multerMiddleware");
const { cloudinary } = require("./config/coludinaryConfig");
const fs = require("fs/promises");
const { unlink } = require("fs");
const productRouter = require("./routes/productRout");
// const User = require("./schemas/userSchema");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.get("/", isLoggedIn, (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  res.json({ message: "Pong!" });
});

app.post("/photo", uploader.single("incommingFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const result = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    res.json({
      message: "Ok",
      url: result.secure_url,
    });
  } catch (err) {
    console.error("Upload/photo error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
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
