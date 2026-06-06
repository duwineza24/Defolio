// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Matrix - Dynamic Origin Acceptance
const allowedOrigins = [
  "http://localhost:5173", 
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy block: Origin unauthorized.'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Transporter Config - Wire up your email system
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Your 16-character Google App Password
  }
});

// Broadcast Route to test if server is live
app.get("/", (req, res) => {
  res.send("Transmission Link Active.");
});

// POST Endpoint: Handles Incoming Portfolio Messages
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation check
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All data fields required." });
  }

  // Formatting what lands in your personal email inbox
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, 
    subject: `🚀 Portfolio Message from ${name}`,
    text: `You received a message via your portfolio matrix:\n\nSender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`,
    replyTo: email 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Transmission Error:", error);
      return res.status(500).json({ success: false, error: "System failed to route message." });
    }
    console.log("Message Dispatched: " + info.response);
    res.status(200).json({ success: true, message: "Transmission Successful." });
  });
});

app.listen(PORT, () => {
  console.log(`Server executing safely on port ${PORT}`);
});