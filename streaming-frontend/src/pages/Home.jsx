import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight, Star } from 'lucide-react';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const movieData = await movieAPI.getAllMovies();
      setMovies(movieData);
      
      // Set first movie as featured if movies exist
      if (movieData.length > 0) {
        setFeaturedMovie(movieData[0]);
      }
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      title: 'Popular on StreamNation',
      movies: movies.slice(0, 6),
    },
    {
      title: 'New Releases',
      movies: movies.slice(6, 12),
    },
    {
      title: 'Continue Watching',
      movies: movies.slice(12, 18),
    },
    {
      title: 'Trending Now',
      movies: movies.slice(18, 24),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading movies..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={fetchMovies}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative h-[70vh] min-h-[500px]">
          <div className="absolute inset-0">
            <img
              src={`https://picsum.photos/seed/hero-${featuredMovie.id}/1920/1080.jpg`}
              alt={featuredMovie.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {featuredMovie.name}
                </h1>
                <p className="text-lg text-gray-300 mb-6 line-clamp-3">
                  {featuredMovie.description}
                </p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-white font-semibold">4.5</span>
                    <span className="text-gray-400">(2.3k)</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">2024</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">2h 15min</span>
                  <span className="text-gray-400">•</span>
                  <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded">
                    HD
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/movie/${featuredMovie.id}`}
                    className="btn-primary flex items-center space-x-2 text-lg px-8 py-3"
                  >
                    <Play className="w-5 h-5" />
                    <span>Play Now</span>
                  </Link>
                  <Link
                    to={`/movie/${featuredMovie.id}`}
                    className="btn-secondary flex items-center space-x-2 text-lg px-8 py-3"
                  >
                    <span>More Info</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movie Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((category, index) => (
          <div key={category.title} className={index > 0 ? 'mt-12' : ''}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {category.title}
              </h2>
              {category.movies.length > 6 && (
                <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                  <span className="text-sm">See more</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {category.movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAddToWatchlist={(movieId) => {
                    console.log('Added to watchlist:', movieId);
                    // Implement watchlist functionality
                  }}
                />
              ))}
            </div>
            
            {category.movies.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No movies available in this category</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">StreamNation</h3>
              <p className="text-gray-400 text-sm">
                Your ultimate streaming destination for movies and entertainment.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Browse</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Movies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">TV Shows</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">New Releases</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">My List</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Help</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Account</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 StreamNation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
