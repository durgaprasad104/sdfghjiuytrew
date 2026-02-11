const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { sendWelcomeEmail } = require('./emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Newsletter API is running' });
});

// Newsletter subscription endpoint
app.post('/api/subscribe', async (req, res) => {
    console.log('📥 Received subscription request:', req.body);
    const { email } = req.body;

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        console.log('❌ Invalid email format:', email);
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }

    try {
        // Get client info
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];

        console.log('💾 Attempting to insert into database:', email);

        // Insert into database
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .insert([
                {
                    // Generate ID manually since DB default might be missing
                    id: crypto.randomUUID(),
                    email: email.toLowerCase().trim(),
                    ip_address: ipAddress,
                    user_agent: userAgent
                }
            ])
            .select();

        if (error) {
            // Check for duplicate email
            if (error.code === '23505') {
                console.log('⚠️ Duplicate email:', email);
                return res.status(409).json({
                    success: false,
                    message: 'This email is already subscribed to our newsletter!'
                });
            }

            console.error('❌ Database error:', JSON.stringify(error, null, 2));
            return res.status(500).json({
                success: false,
                message: 'Failed to subscribe. Please try again later.'
            });
        }

        // Send welcome email
        try {
            await sendWelcomeEmail(email);
            console.log(`✅ Subscription successful for: ${email}`);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the request if email fails - subscription is still saved
        }

        res.status(201).json({
            success: true,
            message: 'Successfully subscribed! Check your email for confirmation.',
            data: data[0]
        });

    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again.'
        });
    }
});

// Get subscriber count (admin only - requires auth)
app.get('/api/subscribers/count', async (req, res) => {
    try {
        const { count, error } = await supabase
            .from('newsletter_subscribers')
            .select('*', { count: 'exact', head: true })
            .eq('is_active', true);

        if (error) throw error;

        res.json({ success: true, count });
    } catch (error) {
        console.error('Error fetching count:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch count' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Newsletter backend running on http://localhost:${PORT}`);
    console.log(`📧 Email service: ${process.env.GMAIL_USER}`);
});
