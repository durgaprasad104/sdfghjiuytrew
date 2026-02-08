
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sqipopeueyplvswecuew.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxaXBvcGV1ZXlwbHZzd2VjdWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NTU1MjYsImV4cCI6MjA4NjEzMTUyNn0.9EitD9iZZeXA88dnBu8LvdMmN_YkfjSpSzvMXt-_osM';

export const supabase = createClient(supabaseUrl, supabaseKey);
