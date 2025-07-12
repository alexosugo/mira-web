export interface BlogPost {
  post_id: string;
  created_at: string;
  title: string;
  content: string;
  author: string;
  publish_date: string;
  image_urls?: string[];
  video_urls?: string[];
  slug: string;
  status: 'published' | 'draft';
  meta_description?: string;
}

export interface BlogPostFormData {
  title: string;
  content: string;
  author: string;
  publish_date: string;
  image_urls: string[];
  video_urls: string[];
  slug: string;
  status: 'published' | 'draft';
  meta_description: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  totalCount: number;
  hasMore: boolean;
}

export interface MediaUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}