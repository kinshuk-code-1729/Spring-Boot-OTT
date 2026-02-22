import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, Play, Trash2, Clock } from 'lucide-react';
import { watchlistAPI, movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const watchlistData = await watchlistAPI.getWatchlist();
      
      // Fetch full movie details for each watchlist item
      const moviesWithDetails = await Promise.all(
        watchlistData.map(async (item) => {
          try {
            const movieDetails = await movieAPI.getMovieById(item.movieId);
            return { ...item, movie: movieDetails };
          } catch (err) {
            console.error('Error fetching movie details:', err);
            return null;
          }
        })
      );
      
      setWatchlist(moviesWithDetails.filter(Boolean));
    } catch (err) {
      setError('Failed to load watchlist. Please try again later.');
      console.error('Error fetching watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await watchlistAPI.removeFromWatchlist(movieId);
      setWatchlist(prev => prev.filter(item => item.movieId !== movieId));
    } catch (err) {
      console.error('Error removing from watchlist:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading your watchlist..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <List className="w-8 h-8 text-netflix-red" />
            <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
          </div>
          <p className="text-gray-400">
            Movies you've saved to watch later
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchWatchlist}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty Watchlist */}
        {!error && watchlist.length === 0 && (
          <div className="text-center py-12">
            <List className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">Your watchlist is empty</h3>
            <p className="text-gray-400 mb-6">
              Start adding movies to your watchlist to see them here
            </p>
            <Link to="/" className="btn-primary">
              Browse Movies
            </Link>
          </div>
        )}

        {/* Watchlist Grid */}
        {!error && watchlist.length > 0 && (
          <div className="space-y-8">
            {/* Grid View */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {watchlist.map((item) => (
                <div key={item.movieId} className="relative group">
                  <MovieCard
                    movie={item.movie}
                    onAddToWatchlist={() => handleRemoveFromWatchlist(item.movieId)}
                    isInWatchlist={true}
                  />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleRemoveFromWatchlist(item.movieId)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* List View */}
            <div className="hidden lg:block">
              <h2 className="text-xl font-semibold text-white mb-4">Detailed View</h2>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-800">
                  {watchlist.map((item) => (
                    <div
                      key={item.movieId}
                      className="p-4 flex items-center space-x-4 hover:bg-gray-800 transition-colors"
                    >
                      <img
                        src={`https://picsum.photos/seed/movie-${item.movie.id}/100/150.jpg`}
                        alt={item.movie.name}
                        className="w-16 h-24 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">{item.movie.name}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                          {item.movie.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Added {item.addedAt || 'recently'}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>2h 15min</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/movie/${item.movieId}`}
                          className="btn-primary flex items-center space-x-1"
                        >
                          <Play className="w-4 h-4" />
                          <span>Play</span>
                        </Link>
                        
                        <button
                          onClick={() => handleRemoveFromWatchlist(item.movieId)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove from watchlist"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
