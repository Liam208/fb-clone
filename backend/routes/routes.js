import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import verifyToken from "../middleware/token.js";
import checkAuth from "../auth/auth.js";
import UserDB from "../models/users.js";
import { userInfo } from "os";
import PostDB from "../models/posts.js";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PAGES_DIR = path.join(__dirname, "..", "..", "frontend", "html");
const JWT_secret = "your_super_secret_key";

router.get("/", checkAuth, async (req, res) => {
  const email = req.user.email;
  const user = await UserDB.findOne({ email });
  const posts = await PostDB.find().sort({ createdAt: -1 });
  console.log("All posts:", posts);

  res.render("index", { user, posts });
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(HTML_PAGES_DIR, "signup.html"));
  console.log("Served signup.html");
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(HTML_PAGES_DIR, "login.html"));
  console.log("served login.html");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserDB.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "wrong mail or pass" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Wrong pasword" });

  const token = jwt.sign({ email }, JWT_secret, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  res.json({ message: "login successful", token });
});
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const userExists = await UserDB.findOne({ email });
    if (userExists)
      return res.status(409).json({ message: "User with this email exists" });

    const existingusername = await UserDB.findOne({ username });
    if (existingusername) {
      return res.status(409).json({ message: "Username is already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserDB({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "user registered" });
  } catch (error) {
    console.error("Signup error:", error);

    // Mongoose validation errors (e.g., minlength, required, unique index error)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") }); // 400 Bad Request for invalid data
    }
    // Specific error for unique index violation from MongoDB if not caught by pre-check
    // E11000 duplicate key error is for unique constraint violations
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A user with this email or username already exists.",
      });
    }

    res.status(500).json({ message: "Server error during signup." });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "logged out successfully" });
});

router.post("/posts", checkAuth, async (req, res) => {
  const { content } = req.body;
  const email = req.user.email;
  const user = await UserDB.findOne({ email });
  const username = user.username;
  console.log("Received post: ", content, "from", username);

  try {
    const newPost = new PostDB({ content, userName: username, userEmail: user });
    await newPost.save();
    console.log("Post saved successfully");
    res.status(201).json({ message: "post created successfully" });
  } catch (error) {
    console.error("Post save failed:", error);
    res.status(500).json({ message: "Error creating post" });
  }
});

export default router;
