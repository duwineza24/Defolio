// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Matrix
app.use(cors());
app.use(express.json());

// Transporter Config - Wire up your email system
const transporter = nodemailer.createTransport({
  service: "gmail", // You can switch this to Outlook/Yahoo if needed
  auth: {
    user: process.env.EMAIL_USER,
    // ⚠️ CRITICAL: This must be an "App Password", not your regular account password
    pass: process.env.EMAIL_PASS 
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
    to: process.env.EMAIL_USER, // Sends it right back to you
    subject: `🚀 Portfolio Message from ${name}`,
    text: `You received a message via your portfolio matrix:\n\nSender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`,
    replyTo: email // Clicking 'reply' in your inbox goes straight back to the user!
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