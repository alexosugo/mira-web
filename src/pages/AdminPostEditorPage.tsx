import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Upload, X, Plus } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost, updatePost, getAllPosts, uploadMedia, generateSlug } from '../services/blogService';
import { BlogPost, BlogPostFormData } from '../types/blog';

const AdminPostEditorPage: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>();
  const navigate = useNavigate();
  const isEditing = postId && postId !== 'new';

  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    content: '',
    author: '',
    publish_date: new Date().toISOString().slice(0, 16),
    image_urls: [],
    video_urls: [],
    slug: '',
    status: 'draft',
    meta_description: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  // Load post data if editing
  useEffect(() => {
    const loadPost = async () => {
      if (isEditing) {
        try {
          setIsLoading(true);
          const posts = await getAllPosts();
          const post = posts.find(p => p.post_id === postId);
          
          if (post) {
            setFormData({
              title: post.title,
              content: post.content,
              author: post.author,
              publish_date: post.publish_date.slice(0, 16),
              image_urls: post.image_urls || [],
              video_urls: post.video_urls || [],
              slug: post.slug,
              status: post.status,
              meta_description: post.meta_description || ''
            });
          } else {
            setError('Post not found');
          }
        } catch (err) {
          setError('Failed to load post');
          console.error('Error loading post:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadPost();
  }, [isEditing, postId]);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !isEditing) {
      const newSlug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.title, isEditing]);

  const handleInputChange = (field: keyof BlogPostFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleMediaUpload = async (files: FileList | null, type: 'image' | 'video') => {
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map(file => 
        uploadMedia(file, type === 'image' ? 'images' : 'videos')
      );

      const results = await Promise.all(uploadPromises);
      
      const successfulUploads = results
        .filter(result => result.success && result.url)
        .map(result => result.url!);

      const failedUploads = results.filter(result => !result.success);

      if (successfulUploads.length > 0) {
        const field = type === 'image' ? 'image_urls' : 'video_urls';
        setFormData(prev => ({
          ...prev,
          [field]: [...prev[field], ...successfulUploads]
        }));
      }

      if (failedUploads.length > 0) {
        setError(`Failed to upload ${failedUploads.length} file(s)`);
      }
    } catch (err) {
      setError('Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploadingMedia(false);
    }
  };

  const removeMedia = (index: number, type: 'image' | 'video') => {
    const field = type === 'image' ? 'image_urls' : 'video_urls';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return false;
    }
    if (!formData.author.trim()) {
      setError('Author is required');
      return false;
    }
    if (!formData.slug.trim()) {
      setError('Slug is required');
      return false;
    }
    return true;
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!validateForm()) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const dataToSave = { ...formData, status };

      if (isEditing) {
        await updatePost(postId!, dataToSave);
        setSuccess('Post updated successfully');
      } else {
        const newPost = await createPost(dataToSave);
        setSuccess('Post created successfully');
        navigate(`/admin/posts/${newPost.post_id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ]
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block', 'link'
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20" style={{ fontFamily: "Funnel Sans" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#C0DC2D]/30 border-t-[#C0DC2D] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20" style={{ fontFamily: "Funnel Sans" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/posts"
              className="flex items-center gap-2 text-gray-600 hover:text-[#C0DC2D] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Posts
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave('draft')}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </button>
            
            <button
              onClick={() => handleSave('published')}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-[#C0DC2D] text-[#13243E] rounded-lg hover:bg-[#C0DC2D]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              <Eye className="h-4 w-4" />
              {formData.status === 'published' ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: "Funnel Display" }}>
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h1>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors font-mono text-sm"
                placeholder="post-url-slug"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                URL: /blog/{formData.slug}
              </p>
            </div>

            {/* Author and Publish Date Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors"
                  placeholder="Author name"
                  required
                />
              </div>

              <div>
                <label htmlFor="publish_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date *
                </label>
                <input
                  type="datetime-local"
                  id="publish_date"
                  value={formData.publish_date}
                  onChange={(e) => handleInputChange('publish_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => handleInputChange('meta_description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors resize-vertical"
                placeholder="Brief description for SEO (optional)"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                  style={{ minHeight: '300px' }}
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#C0DC2D] transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleMediaUpload(e.target.files, 'image')}
                  className="hidden"
                  id="image-upload"
                  disabled={uploadingMedia}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-gray-600">
                    {uploadingMedia ? 'Uploading...' : 'Click to upload images'}
                  </span>
                  <span className="text-sm text-gray-500">
                    Supports JPEG, PNG, WebP (max 10MB each)
                  </span>
                </label>
              </div>

              {formData.image_urls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.image_urls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeMedia(index, 'image')}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Videos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Videos
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#C0DC2D] transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleMediaUpload(e.target.files, 'video')}
                  className="hidden"
                  id="video-upload"
                  disabled={uploadingMedia}
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-gray-600">
                    {uploadingMedia ? 'Uploading...' : 'Click to upload videos'}
                  </span>
                  <span className="text-sm text-gray-500">
                    Supports MP4, WebM, AVI (max 10MB each)
                  </span>
                </label>
              </div>

              {formData.video_urls.length > 0 && (
                <div className="mt-4 space-y-4">
                  {formData.video_urls.map((url, index) => (
                    <div key={index} className="relative group">
                      <video
                        src={url}
                        controls
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeMedia(index, 'video')}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPostEditorPage;