import React, { useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const landingPageStyles = {
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

const buttonContainerStyles = {
  display: 'flex',
  fontSize: '1.5rem',
};

const linkStyles = {
  textDecoration: 'none',
  color: '#3498db', // Blue color
  margin: '0 10px',
  transition: 'color 0.3s ease-in-out',
};

const slashStyles = {
  fontSize: '2rem',
  color: '#333',
};

const LandingPage = () => {
  const { authenticated, role } = useAuth();
  const navigate = useNavigate();

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
  return (
    <div style={landingPageStyles}>
      <h2 style={headingStyles}>Welcome to the App!</h2>
      <div style={buttonContainerStyles}>
        <Link to="/login/student" style={linkStyles}>
          Student
        </Link>
        <span style={slashStyles}>/</span>
        <Link to="/login/professor" style={linkStyles}>
          Professor
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
