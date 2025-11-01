import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);
  return <div>Logging out...</div>;
}
