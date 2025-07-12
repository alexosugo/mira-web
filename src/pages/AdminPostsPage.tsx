import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, User, ArrowLeft } from 'lucide-react';
import { getAllPosts, deletePost } from '../services/blogService';
import { BlogPost } from '../types/blog';

const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(postId);
      await deletePost(postId);
      setPosts(prev => prev.filter(post => post.post_id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20" style={{ fontFamily: "Funnel Sans" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#C0DC2D]/30 border-t-[#C0DC2D] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading posts...</p>
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-gray-600 hover:text-[#C0DC2D] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Blog
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Funnel Display" }}>
              Manage Posts
            </h1>
          </div>
          
          <Link
            to="/admin/posts/new"
            className="flex items-center gap-2 bg-[#C0DC2D] text-[#13243E] px-6 py-3 rounded-lg font-semibold hover:bg-[#C0DC2D]/90 transition-colors"
          >
            <Plus className="h-5 w-5" />
            New Post
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={loadPosts}
              className="text-red-600 hover:text-red-800 font-medium underline mt-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* Posts List */}
        {posts.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Title</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Author</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Publish Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.post_id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                          <p className="text-sm text-gray-500">/{post.slug}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{post.author}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {post.status === 'published' ? (
                            <>
                              <Eye className="h-4 w-4 text-green-500" />
                              <span className="text-green-700 font-medium">Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-4 w-4 text-yellow-500" />
                              <span className="text-yellow-700 font-medium">Draft</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{formatDate(post.publish_date)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {post.status === 'published' && (
                            <Link
                              to={`/blog/${post.slug}`}
                              className="p-2 text-gray-600 hover:text-[#C0DC2D] hover:bg-gray-100 rounded-lg transition-colors"
                              title="View post"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          )}
                          
                          <Link
                            to={`/admin/posts/${post.post_id}`}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit post"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          
                          <button
                            onClick={() => handleDelete(post.post_id)}
                            disabled={deletingId === post.post_id}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete post"
                          >
                            {deletingId === post.post_id ? (
                              <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "Funnel Display" }}>
              No posts yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first blog post to get started.
            </p>
            <Link
              to="/admin/posts/new"
              className="inline-flex items-center gap-2 bg-[#C0DC2D] text-[#13243E] px-6 py-3 rounded-lg font-semibold hover:bg-[#C0DC2D]/90 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Create First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPostsPage;