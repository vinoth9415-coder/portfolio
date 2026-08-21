const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static portfolio files
app.use(express.static(path.join(__dirname, './')));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend Mail Server is running smooth.' });
});

// POST /send-mail Endpoint
const handleSendMail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate Required Fields
    if (!name || !name.trim() || !email || !email.trim() || !subject || !subject.trim() || !message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required.'
      });
    }

    // Email Pattern Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Verify SMTP Environment Variables
    if (!emailUser || !emailPass || emailPass === 'your_16_character_app_password') {
      console.warn('⚠️ SMTP Credentials missing or using placeholder in .env file.');
      return res.status(500).json({
        success: false,
        message: 'Backend SMTP credentials not configured. Please set EMAIL_PASS in your .env file.'
      });
    }

    // Configure Nodemailer Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const formattedDate = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Kolkata'
    });

    // Build Email Options
    const mailOptions = {
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: emailUser,
      replyTo: `"${name}" <${email}>`,
      subject: `📩 Portfolio Inquiry: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nDate: ${formattedDate}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
          <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px; margin-top: 0;">
            New Portfolio Message Received
          </h2>
          
          <table style="width: 100%; color: #e2e8f0; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #94a3b8;">Sender Name:</td>
              <td style="padding: 8px 0; color: #ffffff;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #94a3b8;">Sender Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #94a3b8;">Subject:</td>
              <td style="padding: 8px 0; color: #ffffff;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #94a3b8;">Submitted At:</td>
              <td style="padding: 8px 0; color: #cbd5e1;">${formattedDate}</td>
            </tr>
          </table>

          <div style="margin-top: 25px; padding: 20px; background-color: #1e293b; border-left: 4px solid #3b82f6; border-radius: 6px;">
            <h3 style="margin-top: 0; color: #60a5fa; font-size: 16px;">Message Content:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #f1f5f9; margin-bottom: 0;">${message}</p>
          </div>

          <div style="margin-top: 30px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #334155; padding-top: 15px;">
            You can directly click "Reply" in your email client to respond to <strong>${email}</strong>.
          </div>
        </div>
      `
    };

    // Send Mail via Nodemailer
    await transporter.sendMail(mailOptions);

    console.log(`✅ Email successfully sent from ${email} to ${emailUser}`);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully.'
    });

  } catch (error) {
    console.error('❌ Error sending mail via Nodemailer:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email.'
    });
  }
};

// Register Routes
app.post('/send-mail', handleSendMail);
app.post('/api/send-mail', handleSendMail);

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Express Mail Server running on http://localhost:${PORT}`);
});
