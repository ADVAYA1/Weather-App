import React, { useState } from 'react';

import ParticlesBackground from './components/ParticlesBackground.jsx';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const particlesInit = () => {};

  return (
    <div
      className="login-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 75%, #ffffff 100%)'
      }}
    >
      <ParticlesBackground />
      <form
        className="login-form"
        style={{ position: 'relative', zIndex: 2, background: 'rgba(255,255,255,0.9)', padding: 32, borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.25)', minWidth: 320, maxWidth: 400, width: '100%', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.4)' }}
        onSubmit={async e => {
          e.preventDefault();
          setError('');
          if (!email || !password) {
            setError('Please enter email and password.');
            return;
          }
          try {
            const res = await fetch('http://localhost:5000/api/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) {
              setError(data.error || 'Signup failed');
              return;
            }
            localStorage.setItem('authToken', 'mocktoken');
            localStorage.setItem('currentUser', email);
            localStorage.setItem(`favorites_${email}`, JSON.stringify([]));
            window.location.replace('/');
          } catch (err) {
            setError('Network error');
          }
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 6, background: '#60a5fa', color: '#0b1220', border: 'none', fontWeight: 'bold', fontSize: 16 }}>Sign Up</button>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <a href="/login" style={{ color: '#ff9800' }}>Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
}
