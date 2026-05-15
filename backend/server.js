import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Form_Data",
  })
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// ─── Contact Schema ───────────────────────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema, "Contact");

// ─── Gmail OAuth2 Transporter ─────────────────────────────────────────────────
const createTransporter = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const accessTokenResponse = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type:         "OAuth2",
      user:         process.env.GMAIL_USER,
      clientId:     process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken:  accessTokenResponse.token,
    },
  });
};

// ─── Welcome Email HTML ───────────────────────────────────────────────────────
const welcomeEmailHTML = (name, message) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
      .container { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
      .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 36px 40px; text-align: center; }
      .header h1 { color: #fff; margin: 0; font-size: 26px; letter-spacing: -0.5px; }
      .header p  { color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px; }
      .body { padding: 36px 40px; }
      .body h2 { color: #1e1b4b; font-size: 20px; margin: 0 0 12px; }
      .body p  { color: #4b5563; line-height: 1.7; font-size: 15px; margin: 0 0 16px; }
      .quote { background: #f5f3ff; border-left: 4px solid #6366f1; border-radius: 6px; padding: 14px 18px; color: #374151; font-style: italic; font-size: 14px; margin: 20px 0; }
      .footer { background: #f9fafb; padding: 20px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
      @media screen and (max-width: 600px) {
        .container { margin: 20px 10px; width: auto; }
        .header { padding: 24px 20px; }
        .header h1 { font-size: 22px; }
        .body { padding: 24px 20px; }
        .body h2 { font-size: 18px; }
        .body p { font-size: 14px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🤖 Aitool</h1>
        <p>Your AI-Powered Platform</p>
      </div>
      <div class="body">
        <h2>Hi ${name}! 👋</h2>
        <p>Thanks for reaching out! We've received your message and will get back to you as soon as possible.</p>
        <p>Here's what you sent us:</p>
        <div class="quote">${message}</div>
        <p>We're excited to connect with you. Stay tuned!</p>
        <p style="color:#6366f1; font-weight:600;">— The Aitool Team</p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} Aitool · This is an automated message, please do not reply directly.
      </div>
    </div>
  </body>
</html>
`;

// ─── Contact Route ────────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  try {
    console.log("POST /api/contact body:", req.body);
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 1. Save to MongoDB
    const newContact = new Contact({ name, email, message });
    const savedContact = await newContact.save();
    console.log("✅ Saved contact:", savedContact);

    // 2. Send welcome email via Gmail OAuth2
    const transporter = await createTransporter();
    await transporter.sendMail({
      from:    `"Aitool Team" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: "👋 Thanks for reaching out to Aitool!",
      html:    welcomeEmailHTML(name, message),
    });
    console.log(`📧 Welcome email sent to ${email}`);

    res.status(201).json({
      success: true,
      message: "Message saved & welcome email sent!",
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});