// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// 📡 Middleware Matrix - Authorized Transmission Entry Portals
const allowedOrigins = [
  "http://localhost:5173",                 // Local development canvas
  "https://devotheportifolio.onrender.com", // Your explicit production site
  process.env.FRONTEND_URL                 // Dynamic environmental fallback
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server or curl requests (where origin is undefined)
    if (!origin) return callback(null, true);
    
    // Check if the incoming request origin is explicitly authorized
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy block: Portal origin unauthorized."), false);
    }
  },
  credentials: true
}));

app.use(express.json());
// 🎛️ Transporter Config - Rock-Solid SMTP Layout
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Uses SSL for secure email routing
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

// 📟 Broadcast Route to test if server is live
app.get("/", (req, res) => {
  res.send("Transmission Link Active.");
});

// 🚀 POST Endpoint: Handles Incoming Portfolio Messages
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation check
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All data fields required." });
  }

  // Formatting what lands in your personal email inbox
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Redirects message traffic straight back to you
    subject: `🚀 Portfolio Message from ${name}`,
    text: `You received a message via your portfolio matrix:\n\nSender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`,
    replyTo: email // Clicking 'reply' in your inbox goes straight back to the visitor!
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