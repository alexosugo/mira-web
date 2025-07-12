/*
  # Create blog posts table and storage setup

  1. New Tables
    - `posts`
      - `post_id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text, required)
      - `content` (text, required)
      - `author` (text, required)
      - `publish_date` (timestamp, required)
      - `image_urls` (text array)
      - `video_urls` (text array)
      - `slug` (text, unique, required)
      - `status` (text, required - 'published' or 'draft')
      - `meta_description` (text)

  2. Security
    - Enable RLS on `posts` table
    - Add policy for public to read published posts
    - Add policy for authenticated users to manage posts

  3. Storage
    - Create blog-media bucket for images and videos
*/

CREATE TABLE IF NOT EXISTS posts (
  post_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  publish_date timestamptz NOT NULL,
  image_urls text[],
  video_urls text[],
  slug text UNIQUE NOT NULL,
  status text NOT NULL CHECK (status IN ('published', 'draft')),
  meta_description text
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy for public to read published posts
CREATE POLICY "Anyone can read published posts"
  ON posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Policy for authenticated users to manage posts
CREATE POLICY "Authenticated users can manage posts"
  ON posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for blog media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-media', 'blog-media', true)
ON CONFLICT (id) DO NOTHING;

-- Policy for authenticated users to upload files
CREATE POLICY "Authenticated users can upload blog media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-media');

-- Policy for anyone to view blog media
CREATE POLICY "Anyone can view blog media"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-media');