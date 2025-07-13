import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getPosts } from '../services/blogService';
import { BlogPost, BlogListResponse } from '../types/blog';
import BlogCard from '../components/blog/BlogCard';
import BlogSearch from '../components/blog/BlogSearch';
import BlogPagination from '../components/blog/BlogPagination';

const BlogListingPage: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogListResponse>({
    posts: [],
    totalCount: 0,
    hasMore: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  const postsPerPage = 6;

  const loadPosts = useCallback(async (page: number, search?: string) => {
    try {
      if (search !== undefined) {
        setIsSearching(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const data = await getPosts(page, postsPerPage, search);
      setBlogData(data);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [postsPerPage]);

  // Load posts on component mount
  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  // Handle search
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    loadPosts(1, term);
  }, [loadPosts]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    loadPosts(page, searchTerm);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loadPosts, searchTerm]);

  const totalPages = Math.ceil(blogData.totalCount / postsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20" style={{ fontFamily: "Funnel Sans" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#C0DC2D]/30 border-t-[#C0DC2D] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20" style={{ fontFamily: "Funnel Sans" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#C0DC2D] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
            {isAuthenticated && (
              <>
                <div className="w-px h-6 bg-gray-300"></div>
            <Link
              to="/admin/posts"
              className="flex items-center gap-2 text-gray-600 hover:text-[#C0DC2D] transition-colors"
            >
              <PenTool className="h-5 w-5" />
              Manage Posts
            </Link>
              </>
            )}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "Funnel Display" }}>
            Mira Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Insights, tips, and updates on AI-powered customer service for Kenyan businesses
          </p>
        </div>

        {/* Search */}
        <BlogSearch onSearch={handleSearch} isSearching={isSearching} />

        {/* Results Info */}
        {(searchTerm || blogData.totalCount > 0) && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {searchTerm ? (
                <>
                  Found <span className="font-semibold">{blogData.totalCount}</span> 
                  {blogData.totalCount === 1 ? ' result' : ' results'} for "{searchTerm}"
                </>
              ) : (
                <>
                  Showing <span className="font-semibold">{blogData.totalCount}</span> 
                  {blogData.totalCount === 1 ? ' post' : ' posts'}
                </>
              )}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <p className="text-red-800 text-center">
              {error}
            </p>
            <div className="text-center mt-4">
              <button
                onClick={() => loadPosts(currentPage, searchTerm)}
                className="text-red-600 hover:text-red-800 font-medium underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {blogData.posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogData.posts.map((post) => (
                <BlogCard key={post.post_id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              hasMore={blogData.hasMore}
            />
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "Funnel Display" }}>
              {searchTerm ? 'No posts found' : 'No blog posts yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No posts match your search for "${searchTerm}"`
                : 'Be the first to publish a blog post!'
              }
            </p>
            {searchTerm ? (
              <button
                onClick={() => handleSearch('')}
                className="bg-[#C0DC2D] text-[#13243E] px-6 py-3 rounded-lg font-semibold hover:bg-[#C0DC2D]/90 transition-colors"
              >
                Clear Search
              </button>
            ) : (
              <Link
                to="/admin/posts/new"
                className="bg-[#C0DC2D] text-[#13243E] px-6 py-3 rounded-lg font-semibold hover:bg-[#C0DC2D]/90 transition-colors inline-block"
              >
                Write First Post
              </Link>
            ) : isAuthenticated ? (
              <Link
                to="/admin/posts/new"
                className="bg-[#C0DC2D] text-[#13243E] px-6 py-3 rounded-lg font-semibold hover:bg-[#C0DC2D]/90 transition-colors inline-block"
              >
                Write First Post
              </Link>
            ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListingPage;