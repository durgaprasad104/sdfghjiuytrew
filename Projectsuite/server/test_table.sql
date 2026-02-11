-- Test if the table exists and check its structure
SELECT * FROM newsletter_subscribers LIMIT 1;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'newsletter_subscribers';
