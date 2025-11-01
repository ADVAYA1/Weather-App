
# Weather Analytics Dashboard

A full-stack weather analytics application with user authentication, real-time weather data, interactive charts, and unit conversion (Celsius/Fahrenheit). Built with React, Redux Toolkit, Node.js/Express, and MongoDB Atlas.

## Demo Video 🎥
[Watch the demo](https://github.com/ADVAYA1/Weather-App/blob/main/weather.mkv)

## Features

### Core Functionality
- **Multi-city Dashboard**: Add/remove favorite cities, view current weather with temperature, humidity, and wind speed
- **Unit Conversion**: Toggle between Celsius/Fahrenheit for all temperature, wind, and precipitation values
- **Interactive Charts**: Visualize hourly temperature, precipitation, and wind speed with Recharts (zoom/brush support)
- **Historical Weather Trends**: Select custom date ranges to explore past weather data
- **7-Day Forecast**: View upcoming weather predictions for each city
- **Responsive Design**: Optimized for desktop and mobile (3 cards per row on desktop, stacked on mobile)

### Authentication & Security
- **User Authentication**: Login/Sign-up required to access dashboard
- **MongoDB Atlas Integration**: User credentials and favorites stored securely
- **Session Management**: Redux + localStorage for persistent authentication state

### UI/UX Enhancements
- **Animated Backgrounds**: Particle effects on login/sign-up pages using react-particles and tsparticles-slim
- **Gradient Backgrounds**: Blue-to-white gradients on dashboard and detailed pages
- **Hover Effects**: Interactive cards with smooth transitions
- **LocalStorage Caching**: Reduces API calls and improves performance

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier works)
- WeatherAPI account (free tier works)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "Weather dashboard"
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

### 3. Configure Environment Variables

**Frontend (.env in root directory):**
Create a `.env` file in the project root:
```env
VITE_WEATHERAPI_KEY=your_weatherapi_key_here
```

**Backend (server/.env):**
Create a `.env` file in the `server` folder:
```env
MONGODB_URI=your_mongodb_atlas_connection_string_here
PORT=5000
```

**How to get your API keys:**
- **WeatherAPI Key**: Sign up at [weatherapi.com](https://www.weatherapi.com/) and copy your API key from the dashboard
- **MongoDB URI**: 
  1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a database user with read/write permissions
  3. Get your connection string (replace `<password>` with your database user password)
  4. Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/weatherDB?retryWrites=true&w=majority`

### 4. Run the Application

**Start Backend Server (Terminal 1):**
```bash
cd server
npm start
```
Server runs on `http://localhost:5000`

**Start Frontend Dev Server (Terminal 2):**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173` (or the port Vite assigns)

### 5. Access the Application

1. Open your browser and navigate to `http://localhost:5173`
2. Sign up for a new account or log in
3. Add cities using the search bar
4. Toggle between Celsius/Fahrenheit using the Settings checkbox
5. Click on a city card to view detailed weather stats and historical trends

## Project Structure

```
Weather dashboard/
├── src/
│   ├── App.jsx                 # Main app, routing, auth gating
│   ├── Dashboard.jsx           # Multi-city dashboard view
│   ├── DetailedView.jsx        # City details with charts and history
│   ├── Login.jsx               # Login page with particle effects
│   ├── SignUp.jsx              # Sign-up page with particle effects
│   ├── Logout.jsx              # Logout handler
│   ├── components/
│   │   ├── WeatherCard.jsx     # City weather card component
│   │   ├── WeatherChart.jsx    # Recharts line chart wrapper
│   │   ├── Forecast.jsx        # 7-day forecast component
│   │   ├── SearchBar.jsx       # City search input
│   │   ├── Settings.jsx        # Unit toggle component
│   │   └── ParticlesBackground.jsx  # Particle animation component
│   ├── slices/
│   │   ├── weatherSlice.js     # Redux slice for weather data
│   │   ├── favoritesSlice.js   # Redux slice for favorite cities
│   │   ├── unitSlice.js        # Redux slice for unit preference
│   │   └── authSlice.js        # Redux slice for authentication
│   ├── store.js                # Redux store configuration
│   ├── main.jsx                # React entry point
│   └── responsive.css          # Responsive styles
├── server/
│   ├── server.js               # Express backend with MongoDB
│   ├── package.json            # Backend dependencies
│   └── .env                    # Backend environment variables (gitignored)
├── assets/
│   └── images.png              # Favicon image
├── index.html                  # HTML entry point
├── package.json                # Frontend dependencies
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## Technologies Used

### Frontend
- **React 18** with Hooks
- **Redux Toolkit** for state management
- **React Router DOM** for navigation
- **Recharts** for data visualization
- **react-particles** + **tsparticles-slim** for animated backgrounds
- **Vite** for fast development and building

### Backend
- **Node.js** + **Express** for REST API
- **MongoDB Atlas** for database
- **Mongoose** for MongoDB object modeling
- **bcryptjs** for password hashing
- **cors** for cross-origin requests

### APIs
- **WeatherAPI.com** for current weather, forecasts, and historical data

## Key Features Explained

### Unit Conversion
- Toggle affects all displayed values: temperature (°C/°F), wind (kph/mph), precipitation (mm/in), and dew point
- Data keys dynamically switch between `temp_c`/`temp_f`, `wind_kph`/`wind_mph`, `precip_mm`/`precip_in`
- Chart labels update automatically

### Authentication Flow
1. User signs up → credentials stored in MongoDB with hashed password
2. User logs in → backend validates credentials, returns user data
3. Frontend stores auth state in Redux + localStorage
4. Protected routes redirect to login if not authenticated
5. Favorites synced with backend on add/remove

### Particle Effects
- Login and Sign-up pages feature animated particle networks
- Particles move continuously and connect on hover (grab mode)
- Purple-to-white gradient backgrounds with subtle glow effects

### Responsive Grid Layout
- Dashboard displays 3 city cards per row on desktop
- Cards wrap to new rows as more cities are added
- Mobile view stacks cards vertically for optimal viewing

## Troubleshooting

**Particles not showing:**
- Run `npm install react-particles@2 tsparticles-slim@2`
- Restart the dev server

**Favicon not appearing:**
- Hard refresh the browser (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache

**Backend connection errors:**
- Verify MongoDB URI is correct in `server/.env`
- Check that MongoDB Atlas allows connections from your IP
- Ensure backend server is running on port 5000

**API rate limits:**
- WeatherAPI free tier has request limits
- LocalStorage caching reduces repeated calls

## Future Enhancements
- Add weather alerts and notifications
- Implement more advanced analytics (trends, comparisons)
- Add user profile management
- Export weather data as CSV/PDF
- Dark mode toggle

## License
MIT

## Author
Weather Analytics Dashboard - Full-stack weather application with authentication and interactive visualizations
