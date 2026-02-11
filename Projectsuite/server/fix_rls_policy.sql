-- SIMPLE FIX: Disable RLS for Newsletter Subscribers
-- This table is for public subscriptions, so we can safely disable RLS
-- Run this in Supabase SQL Editor

-- Disable Row Level Security
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
