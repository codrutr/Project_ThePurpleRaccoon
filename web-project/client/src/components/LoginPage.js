import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const loginPageStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  fontFamily: 'Arial, sans-serif',
};

const headingStyles = {
  fontSize: '2rem',
  marginBottom: '20px',
};

const inputStyles = {
  width: '300px',
  padding: '10px',
  marginBottom: '20px',
  fontSize: '1rem',
};

const buttonStyles = {
  padding: '10px',
  fontSize: '1rem',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out',
};

const backButtonStyles = {
  marginTop: '10px',
  fontSize: '1rem',
  cursor: 'pointer',
  color: '#3498db',
  transition: 'color 0.3s ease-in-out',
};

const LoginPage = () => {
  const { role } = useParams();
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      switch (role) {
        case 'student':
          navigate('/projects');
          break;
        case 'professor':
          navigate('/summary');
          break;
        default:
          return;
      }
    }
  }, [authenticated, role, navigate]);

  const handleLogin = async () => {
  
    if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/${role}s?name=${encodeURIComponent(name)}`);
      const data = await response.json();

      if (response.ok) {
        login(data[0].name, data[0].id, role, data[0].projectId ?? 0);

        navigate(role === 'professor' ? '/summary' : '/projects');
      } else {
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} not found. Please try again.`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={loginPageStyles}>
      <h2 style={headingStyles}>Login as {role}</h2>
      <p>Enter your name:</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyles}
      />
      <button onClick={handleLogin} style={buttonStyles}>
        Login
      </button>
      <p style={{ fontSize: '1rem', marginTop: '10px' }}>
        Not a {role}?{' '}
        <span style={backButtonStyles} onClick={() => navigate('/')}>
          Go back to choose another role.
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
