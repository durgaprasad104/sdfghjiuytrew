const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function checkSchema() {
    console.log('Checking table schema...');

    // Explicitly select simpler columns first to avoid potential errors
    const { data, error } = await supabase
        .rpc('get_table_info', { table_name: 'newsletter_subscribers' }) // If RPC doesn't exist, this fails.
    // Fallback to querying indirectly if we can't do direct SQL or if RPC fails.
    // Since we can't run arbitrary SQL via client easily without RLS or an endpoint...
    // We can try to just select * from the table and see the structure in error or result?
    // No, that won't show defaults.

    // Let's try to query with a deliberately failing insert to see which column fails?
    // We already know it fails.

    // We can't easily query information_schema via supabase-js unless we have a helper setup or if we use the REST API on it (often blocked).
    // But we CAN try to insert providing an ID and see if that works. 
    // If providing ID works, then the default is missing.

    const testId = '123e4567-e89b-12d3-a456-426614174000'; // Validation UUID
    const testEmail = `test-schema-${Date.now()}@example.com`;

    console.log('Attempting insert WITH explicit ID...');
    const { data: dataWithId, error: errorWithId } = await supabase
        .from('newsletter_subscribers')
        .insert([{
            id: testId,
            email: testEmail
        }])
        .select();

    if (errorWithId) {
        console.log('❌ Insert with ID failed:', errorWithId);
    } else {
        console.log('✅ Insert with ID SUCCEEDED!');
        console.log('This means the "id" column is missing its DEFAULT value.');
    }
}

checkSchema();
