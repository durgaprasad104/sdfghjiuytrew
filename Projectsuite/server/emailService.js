const nodemailer = require('nodemailer');
require('dotenv').config();

// Create Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service configuration error:', error);
  } else {
    console.log('✅ Email service is ready to send emails');
  }
});

/**
 * Send welcome email to new subscriber
 * @param {string} email - Subscriber's email address
 * @returns {Promise} - Email send result
 */
async function sendWelcomeEmail(email) {
  const mailOptions = {
    from: {
      name: 'ProjectsSuite',
      address: process.env.GMAIL_USER
    },
    to: email,
    subject: 'Welcome to ProjectsSuite! 🚀',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .feature {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #667eea;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .emoji {
            font-size: 24px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">Welcome to ProjectsSuite! 🚀</h1>
        </div>
        <div class="content">
          <p>Hi there!</p>
          <p>Thank you for subscribing to the <strong>ProjectsSuite Newsletter</strong>! Your #1 destination for Major & Minor Student Projects.</p>
          
          <p>Here's what you can expect from us:</p>
          
          <div class="feature">
            <span class="emoji">🎓</span> <strong>Student Projects</strong> - Complete source codes & documentation for Major/Minor projects
          </div>
          
          <div class="feature">
            <span class="emoji">💻</span> <strong>Web Development</strong> - Custom website building services
          </div>
          
          <div class="feature">
            <span class="emoji">🛠️</span> <strong>Software Solutions</strong> - Custom software for your specific needs
          </div>
          
          <div class="feature">
            <span class="emoji">🎁</span> <strong>Exclusive Offers</strong> - Get special discounts for students
          </div>
          
          <p style="margin-top: 30px;">Stay tuned for amazing content and updates!</p>
          
          <p>Best regards,<br>
          <strong>The ProjectsSuite Team</strong></p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ProjectsSuite. All rights reserved.</p>
          <p style="font-size: 12px; color: #9ca3af;">
            You're receiving this email because you subscribed to our newsletter.
          </p>
        </div>
      </body>
      </html>
    `,
    text: `
Welcome to ProjectsSuite! 🎉

Hi there!

Thank you for subscribing to the ProjectsSuite Newsletter! Your #1 destination for Major & Minor Student Projects.

Here's what you can expect from us:

🎓 Student Projects - Complete source codes & documentation for Major/Minor projects
💻 Web Development - Custom website building services
🛠️ Software Solutions - Custom software for your specific needs
🎁 Exclusive Offers - Get special discounts for students

Stay tuned for amazing content and updates!

Best regards,
The ProjectsSuite Team

© ${new Date().getFullYear()} ProjectsSuite. All rights reserved.
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}

module.exports = { sendWelcomeEmail };
