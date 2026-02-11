const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function testSubscription() {
    console.log('Testing Supabase connection...');
    console.log('URL:', process.env.SUPABASE_URL);

    const testEmail = `test${Date.now()}@example.com`;

    console.log('\n📧 Testing with email:', testEmail);

    const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([
            {
                email: testEmail,
                ip_address: '127.0.0.1',
                user_agent: 'Test Script'
            }
        ])
        .select();

    if (error) {
        console.error('\n❌ Error:', JSON.stringify(error, null, 2));
    } else {
        console.log('\n✅ Success! Data:', JSON.stringify(data, null, 2));
    }
}

testSubscription();
