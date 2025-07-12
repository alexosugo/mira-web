import { supabase } from '../lib/supabase';
import { BlogPost, BlogPostFormData, BlogListResponse, MediaUploadResult } from '../types/blog';

// Helper function to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
};

// Fetch paginated list of published posts
export const getPosts = async (
  page: number = 1,
  limit: number = 10,
  searchTerm?: string
): Promise<BlogListResponse> => {
  try {
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('publish_date', { ascending: false });

    // Add search filter if provided
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
    }

    // Add pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    return {
      posts: data || [],
      totalCount: count || 0,
      hasMore: (count || 0) > page * limit
    };
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw error;
  }
};

// Fetch single post by slug
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Post not found
      }
      console.error('Error fetching post by slug:', error);
      throw new Error(`Failed to fetch post: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    throw error;
  }
};

// Fetch all posts for admin (including drafts)
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all posts:', error);
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    throw error;
  }
};

// Create new post
export const createPost = async (postData: BlogPostFormData): Promise<BlogPost> => {
  try {
    // Generate slug if not provided or ensure uniqueness
    let finalSlug = postData.slug || generateSlug(postData.title);
    
    // Check if slug exists and make it unique
    const { data: existingPost } = await supabase
      .from('posts')
      .select('slug')
      .eq('slug', finalSlug)
      .single();

    if (existingPost) {
      finalSlug = `${finalSlug}-${Date.now()}`;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{
        ...postData,
        slug: finalSlug,
        publish_date: postData.publish_date || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      throw new Error(`Failed to create post: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in createPost:', error);
    throw error;
  }
};

// Update existing post
export const updatePost = async (postId: string, postData: Partial<BlogPostFormData>): Promise<BlogPost> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update(postData)
      .eq('post_id', postId)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
      throw new Error(`Failed to update post: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in updatePost:', error);
    throw error;
  }
};

// Delete post
export const deletePost = async (postId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('post_id', postId);

    if (error) {
      console.error('Error deleting post:', error);
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in deletePost:', error);
    throw error;
  }
};

// Upload media file to Supabase Storage
export const uploadMedia = async (file: File, folder: string = 'images'): Promise<MediaUploadResult> => {
  try {
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size must be less than 10MB'
      };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-media')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return {
        success: false,
        error: `Failed to upload file: ${uploadError.message}`
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-media')
      .getPublicUrl(fileName);

    return {
      success: true,
      url: publicUrl
    };
  } catch (error) {
    console.error('Error in uploadMedia:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};