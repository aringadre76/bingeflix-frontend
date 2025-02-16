# BingeFlix - Your Streaming Guide

A modern web application that helps users discover where to stream their favorite movies and shows, track their watchlist, and get personalized recommendations.

## Features

- **Google OAuth Login**: Secure authentication using Google accounts
- **Movie Search**: Find movies and shows across multiple streaming platforms
- **Smart Watchlist**: Save and organize your movies and shows
- **AI Recommendations**: Get personalized movie suggestions based on your watchlist
- **Sports Tracking**: Follow your favorite sports teams
- **Streaming Links**: Direct links to where you can watch your content

## Tech Stack

- React.js
- Tailwind CSS
- Google OAuth 2.0
- Vercel Deployment

## Local Development

1. Clone and install:
```bash
git clone <repository-url>
cd bingeflix-frontend
npm install
```

2. Set up environment variables:
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

3. Start development server:
```bash
npm start
```

## Project Structure

```
bingeflix-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Home-page/      # Main application components
│   │   ├── Header-elem/    # Navigation and header components
│   │   └── Styles/         # CSS and styling
│   ├── App.js              # Root component
│   └── index.js            # Entry point
└── package.json
```

## Deployment

The frontend is deployed on Vercel and automatically updates when changes are pushed to the main branch.

Visit: [https://bingeflixstreaming.vercel.app](https://bingeflixstreaming.vercel.app)
