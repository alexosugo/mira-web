import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (searchTerm: string) => void;
  isSearching: boolean;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch, isSearching }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0DC2D] focus:border-transparent transition-colors"
            disabled={isSearching}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isSearching}
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
        
        {isSearching && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
            <div className="w-5 h-5 border-2 border-[#C0DC2D]/30 border-t-[#C0DC2D] rounded-full animate-spin"></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BlogSearch;