import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Star, Calendar } from 'lucide-react';

const MovieCard = ({ movie, onAddToWatchlist, isInWatchlist = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWatchlist?.(movie.id);
  };

  const generateThumbnail = (movieId) => {
    // Generate a placeholder thumbnail URL based on movie ID
    return `https://picsum.photos/seed/movie-${movieId}/300/450.jpg`;
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        {/* Movie Poster */}
        <div className="w-full h-full bg-gray-800">
          {!imageError ? (
            <img
              src={generateThumbnail(movie.id)}
              alt={movie.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsLoading(false)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center mx-auto mb-2">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <p className="text-white text-sm font-medium truncate">{movie.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {isLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="w-8 h-8 border-2 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="movie-card-overlay">
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
              {movie.name}
            </h3>
            <p className="text-gray-300 text-xs line-clamp-2 mb-3">
              {movie.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="w-8 h-8 bg-netflix-red rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <Play className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={handleAddToWatchlist}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isInWatchlist
                      ? 'bg-netflix-red hover:bg-red-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-white text-xs">4.5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Genre Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded">
            HD
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
