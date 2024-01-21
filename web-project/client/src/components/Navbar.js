import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { authenticated, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '40px', padding: '10px', backgroundColor: '#3498db', color: '#fff', textAlign: 'right' }}>
      {authenticated ? (
        <>
          <span style={{ marginRight: '10px' }}>Hello, {username}!</span>
          <button onClick={handleLogout} style={{ padding: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/">
          <button style={{ padding: '5px', cursor: 'pointer' }}>
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
