import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Create Gmail Transporter (do this outside handler to reuse connection)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    // Initialize Supabase Client inside handler to ensure env vars are available
    // and to catch initialization errors gracefully
    let supabase;
    try {
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
            console.error('Missing Supabase Environment Variables');
            throw new Error('Server configuration error: Missing Supabase credentials');
        }
        supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    } catch (initError) {
        console.error('Supabase Initialization Error:', initError);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server Configuration Error: ' + initError.message }),
        };
    }

    try {
        const { email } = JSON.parse(event.body);

        // Basic validation
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid email address' }),
            };
        }

        // 1. Insert into Supabase
        const { data, error: dbError } = await supabase
            .from('newsletter_subscribers')
            .insert([
                {
                    id: crypto.randomUUID(), // Ensure ID generation
                    email: email.toLowerCase().trim(),
                    ip_address: event.headers['client-ip'] || event.headers['x-forwarded-for'],
                    user_agent: event.headers['user-agent'],
                }
            ])
            .select();

        if (dbError) {
            if (dbError.code === '23505') { // Duplicate email
                return {
                    statusCode: 409,
                    body: JSON.stringify({ message: 'Email already subscribed' }),
                };
            }
            console.error('Database Error:', dbError);
            throw dbError;
        }

        // 2. Send Welcome Email
        const mailOptions = {
            from: {
                name: 'ProjectsSuite',
                address: process.env.GMAIL_USER,
            },
            to: email,
            subject: 'Welcome to ProjectsSuite! 🚀',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                  .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                  .feature { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; border-radius: 5px; }
                  .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
                  .emoji { font-size: 24px; }
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
                  
                  <div class="feature"><span class="emoji">🎓</span> <strong>Student Projects</strong> - Complete source codes & documentation</div>
                  <div class="feature"><span class="emoji">💻</span> <strong>Web Development</strong> - Custom website building services</div>
                  <div class="feature"><span class="emoji">🛠️</span> <strong>Software Solutions</strong> - Custom software for your specific needs</div>
                  <div class="feature"><span class="emoji">🎁</span> <strong>Exclusive Offers</strong> - Get special discounts for students</div>
                  
                  <p style="margin-top: 30px;">Stay tuned for amazing content and updates!</p>
                  
                  <p>Best regards,<br><strong>The ProjectsSuite Team</strong></p>
                </div>
                
                <div class="footer">
                  <p>© ${new Date().getFullYear()} ProjectsSuite. All rights reserved.</p>
                  <p>You're receiving this email because you subscribed to our newsletter.</p>
                </div>
              </body>
              </html>
            `,
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Successfully subscribed' }),
        };

    } catch (error) {
        console.error('Function Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
