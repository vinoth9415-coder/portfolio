const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Set CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle HTTP OPTIONS Preflight Request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Method Not Allowed. Use POST.'
      })
    };
  }

  try {
    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (parseErr) {
        body = {};
      }
    }

    const { name, email, subject, message } = body;

    // Validate Required Fields
    if (!name || !name.trim() || !email || !email.trim() || !subject || !subject.trim() || !message || !message.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'All fields (name, email, subject, message) are required.'
        })
      };
    }

    // Validate Email Pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Please provide a valid email address.'
        })
      };
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Verify SMTP Environment Variables
    if (!emailUser || !emailPass) {
      console.warn('⚠️ EMAIL_USER or EMAIL_PASS missing in Netlify Environment Variables.');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Server email configuration missing. Please add EMAIL_USER and EMAIL_PASS in Netlify settings.'
        })
      };
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
              <td style="padding: 8px 0; font-weight: bold; color: #cbd5e1;">Submitted At:</td>
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

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully.'
      })
    };
  } catch (error) {
    console.error('❌ Error sending mail in Netlify function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to send email.'
      })
    };
  }
};
