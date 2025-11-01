import React, { useState } from 'react';

export default function SearchBar({ onAdd }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const res = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${e.target.value}`);
      const data = await res.json();
      setResults(data);
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <input type="text" value={query} onChange={handleSearch} placeholder="Search city..." />
      {results.length > 0 && (
        <ul style={{ background: '#fff', border: '1px solid #ccc', position: 'absolute', zIndex: 10 }}>
          {results.map(city => (
            <li key={city.id} style={{ cursor: 'pointer' }} onClick={() => { onAdd(city.name); setQuery(''); setResults([]); }}>{city.name}, {city.country}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
