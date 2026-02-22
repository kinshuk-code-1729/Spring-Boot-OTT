import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, ArrowLeft, Star, Calendar, Clock, Plus, Check } from 'lucide-react';
import { movieAPI, watchlistAPI } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const movieData = await movieAPI.getMovieById(id);
      setMovie(movieData);
      
      // Get streaming URL
      const url = movieAPI.getStreamUrl(id);
      setStreamUrl(url);
    } catch (err) {
      setError('Failed to load movie details. Please try again later.');
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayMovie = () => {
    setShowPlayer(true);
  };

  const handleAddToWatchlist = async () => {
    try {
      if (isInWatchlist) {
        await watchlistAPI.removeFromWatchlist(id);
        setIsInWatchlist(false);
      } else {
        await watchlistAPI.addToWatchlist(id);
        setIsInWatchlist(true);
      }
    } catch (err) {
      console.error('Error updating watchlist:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading movie details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Movie not found</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>

        {/* Movie Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={`https://picsum.photos/seed/movie-${movie.id}/400/600.jpg`}
                alt={movie.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded">
                  HD
                </span>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {movie.name}
            </h1>

            {/* Movie Metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-white font-semibold">4.5</span>
                <span className="text-gray-400">(2.3k reviews)</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">2024</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">2h 15min</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                Action
              </span>
              <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                Drama
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={handlePlayMovie}
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-3"
              >
                <Play className="w-5 h-5" />
                <span>Play Now</span>
              </button>
              
              <button
                onClick={handleAddToWatchlist}
                className={`btn-secondary flex items-center space-x-2 text-lg px-6 py-3`}
              >
                {isInWatchlist ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>In List</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add to List</span>
                  </>
                )}
              </button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Cast</h3>
                <div className="space-y-2">
                  <div className="text-gray-300">
                    <span className="font-medium">John Doe</span> as Lead Actor
                  </div>
                  <div className="text-gray-300">
                    <span className="font-medium">Jane Smith</span> as Lead Actress
                  </div>
                  <div className="text-gray-300">
                    <span className="font-medium">Robert Johnson</span> as Supporting
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Director</h3>
                <div className="text-gray-300">
                  <span className="font-medium">Christopher Nolan</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 mt-4">Studio</h3>
                <div className="text-gray-300">
                  <span className="font-medium">StreamNation Studios</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        {showPlayer && streamUrl && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Watch Now</h2>
            <VideoPlayer
              url={streamUrl}
              title={movie.name}
              onEnded={() => console.log('Video ended')}
              onProgress={(progress) => console.log('Progress:', progress)}
            />
          </div>
        )}

        {/* Similar Movies */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
          <div className="text-center py-8">
            <p className="text-gray-400">Similar movies will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
