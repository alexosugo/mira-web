/*
  # Authentication Setup

  1. Enable Authentication
    - Enable email/password authentication in Supabase
    - Set up user management

  2. Security
    - Configure RLS policies for admin access
    - Set up proper user roles

  3. Demo User
    - Create a demo admin user for testing
*/

-- Enable RLS on posts table for admin access
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read published posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can manage posts" ON posts;

-- Create new policies with better security
CREATE POLICY "Anyone can read published posts"
  ON posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage all posts"
  ON posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Note: In a production environment, you would want to create an admin role
-- and restrict post management to only admin users. For this demo, 
-- we're allowing any authenticated user to manage posts.

-- The demo user (admin@mira-ai.ke with password 'admin123') should be created 
-- through the Supabase Auth interface or programmatically through the 
-- application signup process.