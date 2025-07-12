import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ExternalLink } from 'lucide-react';
import { getPostBySlug } from '../services/blogService';
import { BlogPost } from '../types/blog';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Post not found');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const postData = await getPostBySlug(slug);
        
        if (!postData) {
          setError('Post not found');
        } else {
          setPost(postData);
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-20" style={{ fontFamily: "Funnel Sans" }}>
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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-20" style={{ fontFamily: "Funnel Sans" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Funnel Display" }}>
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              {error || 'The blog post you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-[#C0DC2D] text-[#13243E] px-6 py-3 rounded-lg font-semibold hover:bg-[#C0DC2D]/90 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Funnel Sans" }}>
      {/* Header */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#C0DC2D] transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Featured Image */}
          {post.image_urls && post.image_urls.length > 0 && (
            <div className="aspect-video mb-8 rounded-2xl overflow-hidden">
              <img
                src={post.image_urls[0]}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "Funnel Display" }}>
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(post.publish_date)}</span>
              </div>
            </div>

            {/* Meta Description */}
            {post.meta_description && (
              <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-[#C0DC2D] pl-6">
                {post.meta_description}
              </p>
            )}
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#C0DC2D] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Additional Images */}
          {post.image_urls && post.image_urls.length > 1 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Funnel Display" }}>
                Gallery
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {post.image_urls.slice(1).map((imageUrl, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={imageUrl}
                      alt={`${post.title} - Image ${index + 2}`}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {post.video_urls && post.video_urls.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Funnel Display" }}>
                Videos
              </h3>
              <div className="space-y-6">
                {post.video_urls.map((videoUrl, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <video
                      controls
                      className="w-full h-auto"
                      preload="metadata"
                    >
                      <source src={videoUrl} type="video/mp4" />
                      <p className="p-4 bg-gray-100 text-gray-700">
                        Your browser doesn't support video playback. 
                        <a href={videoUrl} className="text-[#C0DC2D] underline ml-1">
                          Download the video
                        </a>
                      </p>
                    </video>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Call to Action */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Funnel Display" }}>
            Ready to Transform Your Customer Service?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Join the waitlist for Mira and be among the first to experience AI-powered customer support.
          </p>
          <Link
            to="/#contact-form"
            className="inline-flex items-center gap-2 bg-[#C0DC2D] text-[#13243E] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#C0DC2D]/90 transition-colors"
          >
            Get Early Access
            <ExternalLink className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;