# StreamNation - Movie Streaming Platform Frontend

A comprehensive ReactJS application for a movie streaming platform, built with Vite, Tailwind CSS, and integrated with Spring Boot microservices backend.

## 🚀 Features

- **Modern UI/UX**: Netflix-inspired dark theme with responsive design
- **Movie Catalog**: Browse and discover movies with beautiful card layouts
- **Advanced Search**: Search movies by title, genre, or description
- **Video Streaming**: Integrated video player with controls (HLS/DASH support)
- **User Authentication**: Login/register with JWT token management
- **Watchlist Management**: Add/remove movies from personal watchlist
- **User Profile**: Manage account settings and viewing history
- **Responsive Design**: Mobile-friendly with Tailwind CSS utilities
- **Performance Optimized**: Lazy loading, infinite scrolling, and efficient API calls

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router DOM
- **Styling**: Tailwind CSS with custom Netflix-inspired theme
- **HTTP Client**: Axios with interceptors for auth and error handling
- **Video Player**: React Player with custom controls
- **Icons**: Lucide React
- **State Management**: React Context API for authentication

## 📁 Project Structure

```
streaming-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar with search
│   │   ├── MovieCard.jsx    # Movie card component
│   │   ├── VideoPlayer.jsx  # Custom video player
│   │   ├── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Homepage with featured movies
│   │   ├── MovieDetails.jsx # Individual movie page
│   │   ├── Search.jsx       # Search results page
│   │   ├── Login.jsx        # Authentication page
│   │   ├── Register.jsx     # Registration page
│   │   ├── Watchlist.jsx    # User watchlist
│   │   └── Profile.jsx      # User profile page
│   ├── services/            # API service layer
│   │   └── api.js           # Axios configuration and API calls
│   ├── context/             # React Context
│   │   └── AuthContext.jsx  # Authentication context
│   ├── App.jsx              # Main app component with routing
│   ├── App.css              # App-specific styles
│   └── index.css            # Global styles with Tailwind
├── public/                  # Static assets
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── .env                     # Environment variables
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Backend microservices running (see Backend Integration section)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   VITE_STREAMING_BASE_URL=http://localhost:8080
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🔌 Backend Integration

This frontend is designed to work with your Spring Boot microservices:

### API Endpoints

- **API Gateway**: `http://localhost:8080`
- **Movie Catalog Service**: `/movie-info/*`
- **Movie Streaming Service**: `/stream/*`

### Available Endpoints

```javascript
// Movie Catalog
GET /movie-info/list              // Get all movies
GET /movie-info/find-path-by-id/{id}  // Get movie path by ID

// Streaming
GET /stream/with-id/{movieId}     // Stream video by movie ID
```

### Authentication

The frontend includes mock authentication that can be easily replaced with your actual auth endpoints:

```javascript
// In src/services/api.js, replace mock implementations:
authAPI.login(credentials)        // POST to your auth endpoint
authAPI.register(userData)        // POST to your registration endpoint
```

## 🎨 Design System

### Color Palette (Netflix-inspired)

- **Primary Red**: `#E50914` (Netflix red)
- **Background Black**: `#141414` (Netflix black)
- **Dark Gray**: `#181818` (Netflix dark)
- **Text Gray**: `#808080` (Netflix gray)

### Components

- **Movie Cards**: Hover effects with overlay information
- **Video Player**: Custom controls with keyboard shortcuts
- **Navigation**: Fixed header with search functionality
- **Forms**: Modern input styling with validation

## 🚀 Key Features Implementation

### 1. Movie Catalog
- Grid layout with responsive columns
- Hover effects showing movie details
- Lazy loading for performance
- Category-based organization

### 2. Video Streaming
- React Player integration
- Custom controls (play/pause, volume, fullscreen)
- Keyboard shortcuts (Space, Arrow keys, M, F)
- Progress tracking and seeking

### 3. Search Functionality
- Real-time search through movie titles and descriptions
- Search results with highlighting
- Search history (can be implemented)

### 4. User Authentication
- JWT token management
- Protected routes
- Auto-logout on token expiration
- Persistent login state

### 5. Watchlist Management
- Add/remove movies from watchlist
- Persistent storage (localStorage/mock API)
- Quick actions from movie cards

## 📱 Responsive Design

- **Mobile**: 1-2 columns for movie grids
- **Tablet**: 3-4 columns for movie grids
- **Desktop**: 6 columns for movie grids
- **Adaptive navigation** with mobile menu

## 🎯 Performance Optimizations

- **Lazy Loading**: Images and components load as needed
- **API Caching**: Axios interceptors for response caching
- **Code Splitting**: React Router lazy loading (can be implemented)
- **Image Optimization**: Placeholder images with proper sizing

## 🔧 Customization

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

### API Integration

1. Add new endpoints in `src/services/api.js`
2. Create custom hooks if needed
3. Handle loading and error states

### Styling

1. Modify `tailwind.config.js` for theme changes
2. Add utility classes in `src/index.css`
3. Component-specific styles in respective files

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend allows frontend origin
2. **API Connection**: Check if backend services are running
3. **Environment Variables**: Verify `.env` file configuration
4. **Video Streaming**: Ensure video files are accessible at configured paths

### Development Tips

- Use browser dev tools to inspect API calls
- Check Network tab for streaming requests
- Console logs show authentication state changes
- Responsive design can be tested with dev tools device simulation

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables for Production

Create `.env.production`:
```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_STREAMING_BASE_URL=https://your-streaming-domain.com
```

### Static Hosting

The build output can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

## 📄 License

This project is part of the StreamNation microservices architecture.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues related to:
- **Backend Integration**: Check microservices documentation
- **Frontend Issues**: Review React and Tailwind CSS documentation
- **Deployment**: Consult hosting provider documentation
