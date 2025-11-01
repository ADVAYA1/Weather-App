import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard.jsx';
import './responsive.css';
import DetailedView from './DetailedView.jsx';
import SearchBar from './components/SearchBar.jsx';
import Settings from './components/Settings.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Logout from './Logout.jsx';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();
  const currentUser = localStorage.getItem('currentUser');
  const [favorites, setFavorites] = useState(() => {
    if (!currentUser) return [];
    const saved = localStorage.getItem(`favorites_${currentUser}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'celsius');
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    if (!isAuthenticated && !isAuthPage) {
      navigate('/login');
    }
  }, [isAuthenticated, isAuthPage, navigate]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`favorites_${currentUser}` , JSON.stringify(favorites));
    }
  }, [favorites, currentUser]);
  useEffect(() => {
    localStorage.setItem('unit', unit);
  }, [unit]);

  const syncFavorites = async (newFavorites) => {
    if (!currentUser) return;
    try {
      await fetch('http://localhost:5000/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser, favorites: newFavorites })
      });
    } catch (err) {
      // Optionally handle error
    }
  };
  const handleAddCity = (city) => {
    if (!favorites.includes(city)) {
      const updated = [...favorites, city];
      setFavorites(updated);
      syncFavorites(updated);
    }
  };
  const handleSelectCity = (city) => {
    navigate(`/city/${city}`);
  };
  const handleToggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };
  const handleRemoveCity = (city) => {
    const updated = favorites.filter(c => c !== city);
    setFavorites(updated);
    syncFavorites(updated);
  };

  // Always render, but show loading or nothing if not authenticated and not on auth page
  if (!isAuthenticated && !isAuthPage && location.pathname !== '/logout') {
    return <div />;
  }

  // After successful login/signup, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated && isAuthPage) {
      navigate('/');
    }
  }, [isAuthenticated, isAuthPage, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <div style={{ padding: 32 }}>
              <h1>Weather Analytics Dashboard</h1>
              <Settings unit={unit} onToggle={handleToggleUnit} />
              <SearchBar onAdd={handleAddCity} />
              <Routes>
                <Route path="/" element={<Dashboard cities={favorites} onSelect={handleSelectCity} unit={unit} />} />
                <Route path="/city/:cityName" element={<DetailedView unit={unit} />} />
              </Routes>
              <div style={{ marginTop: 24 }}>
                <h3>Favorites</h3>
                <ul>
                  {favorites.map(city => (
                    <li key={city}>
                      {city} <button onClick={() => handleRemoveCity(city)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 16 }}>
                  <a href="/logout" style={{ color: '#8884d8', fontWeight: 'bold' }}>Logout</a>
                </div>
              </div>
            </div>
          ) : null
        }
      />
    </Routes>
  );
}

export default App;
