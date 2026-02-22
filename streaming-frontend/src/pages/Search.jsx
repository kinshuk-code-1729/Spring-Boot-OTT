import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Film } from 'lucide-react';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await movieAPI.searchMovies(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery.trim())}`);
      performSearch(searchQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            {query ? `Search Results for "${query}"` : 'Search Movies'}
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies by title, genre, or cast..."
                className="w-full bg-gray-800 text-white px-12 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-netflix-red text-lg"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-netflix-red hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" text="Searching movies..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => performSearch(query)}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && (
          <>
            {query && searchResults.length === 0 && (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">No movies found</h3>
                <p className="text-gray-400 mb-6">
                  We couldn't find any movies matching "{query}"
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Try:</p>
                  <ul className="list-disc list-inside">
                    <li>Checking your spelling</li>
                    <li>Using more general terms</li>
                    <li>Searching by genre or actor name</li>
                  </ul>
                </div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-400">
                    Found {searchResults.length} movie{searchResults.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {searchResults.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onAddToWatchlist={(movieId) => {
                        console.log('Added to watchlist:', movieId);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {!query && (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Start searching</h3>
                <p className="text-gray-400">
                  Enter a movie title, genre, or actor name in the search bar above
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
