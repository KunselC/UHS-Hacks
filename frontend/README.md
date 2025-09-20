# Environmental Risk Assessment - Frontend

A modern React frontend for the Environmental Risk Assessment application that provides AI-powered vegetation analysis and educational insights about drought and wildfire risks.

## Features

- **AI-Powered Analysis**: Upload vegetation photos for instant AI analysis using Google Gemini Vision
- **Location-Based Assessment**: Get environmental data for any location using coordinates or GPS
- **Educational Content**: Learn about environmental science while assessing risks
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Built with accessibility best practices and screen reader support
- **Modern UI**: Clean, nature-inspired design with smooth animations

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Axios** - HTTP client for API communication
- **Lucide React** - Beautiful, consistent icons
- **CSS3** - Custom styling with CSS variables and responsive design
- **Webpack** - Build system and development server

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running (see backend README)

### Installation

1. **Clone and navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment:**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` to set your backend API URL:

   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Start development server:**

   ```bash
   npm start
   ```

5. **Open in browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Header.js       # Navigation header
│   │   ├── Hero.js         # Landing section
│   │   ├── AssessmentForm.js # Photo upload and location form
│   │   ├── Results.js      # Assessment results display
│   │   └── Footer.js       # Site footer
│   ├── App.js              # Main application component
│   ├── App.css             # Main stylesheet
│   └── index.js            # Application entry point
├── package.json            # Dependencies and scripts
├── webpack.config.js       # Build configuration
└── .env.example           # Environment variables template
```

## API Integration

The frontend communicates with the FastAPI backend through the following endpoints:

- `POST /api/assess-risk` - Submit vegetation photo and location for analysis
- Returns comprehensive risk assessment with AI analysis, environmental data, and recommendations

## Component Overview

### Header

- Navigation and branding
- Responsive mobile menu
- Nature-themed design

### Hero

- Landing section with feature highlights
- Educational messaging
- Visual nature scene illustration

### AssessmentForm

- Photo upload with drag-and-drop
- GPS location detection
- Manual coordinate input
- Form validation and error handling

### Results

- Risk score visualization
- Vegetation health analysis
- Environmental conditions display
- Risk factor breakdown
- Actionable recommendations
- Educational content

### Footer

- Resource links
- Educational references
- Contact information
- Accessibility and legal links

## Styling

The application uses a comprehensive CSS system with:

- **CSS Variables**: Consistent theming and easy customization
- **Nature Color Palette**: Greens, earth tones, and sky blues
- **Responsive Grid**: Flexible layouts for all screen sizes
- **Accessibility**: High contrast support, reduced motion, and screen reader compatibility
- **Modern Effects**: Subtle animations, shadows, and hover states

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests (when implemented)
- `npm run eject` - Eject from Create React App (not recommended)

### Code Style

- Functional components with React hooks
- Consistent naming conventions
- Comprehensive error handling
- Clean, readable JSX structure

## Deployment

### Static Hosting

The built application can be deployed to any static hosting service:

1. Build the application: `npm run build`
2. Upload the `build` folder contents to your hosting provider
3. Configure the backend API URL in production environment

### Environment Variables

Set the following environment variables for production:

```env
REACT_APP_API_URL=https://your-backend-api.com
REACT_APP_ENV=production
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style and component structure
2. Test on multiple browsers and screen sizes
3. Ensure accessibility compliance
4. Update documentation for new features

## License

This project is part of the Environmental Risk Assessment application, built for educational purposes to promote environmental awareness and science education.
