// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const initializeSession = () => {
  const storedAuthenticated = sessionStorage.getItem('authenticated');
  const storedUsername = sessionStorage.getItem('username');
  const storedUid = sessionStorage.getItem('uid');
  const storedRole = sessionStorage.getItem('role');
  const storedProjectId = sessionStorage.getItem('projectId');

  if (storedAuthenticated && storedUsername &&  storedUid && storedRole && storedProjectId) {
    return {
      authenticated: true,
      username: storedUsername,
      uid: storedUid,
      role: storedRole,
      projectId: storedProjectId
    };
  }

  return {
    authenticated: false,
    username: '',
    uid: 0,
    role: '',
    projectId: 0
  };
};

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(initializeSession());

  const login = (name, uid, role, projectId) => {
    setAuthData({
      authenticated: true,
      username: name,
      uid: uid,
      role: role,
      projectId: projectId
    });

    sessionStorage.setItem('authenticated', 'true');
    sessionStorage.setItem('username', name);
    sessionStorage.setItem('uid', uid);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('projectId', projectId);
  };

  const logout = () => {
    setAuthData({
      authenticated: false,
      username: '',
      uid: 0,
      role: '',
      projectId: 0
    });

    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('projectId');
  };

  return (
    <AuthContext.Provider value={{ ...authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    const { authenticated, username, uid, role, projectId } = context;

    if (!authenticated && !username && !uid && !role && projectId) {
      const { authenticated: sessionAuth, username: sessionUsername, uid: sessionUid, role: sessionRole, projectId: sessionProjectId } = initializeSession();

      if (sessionAuth) {
        context.login(sessionUsername, sessionUid, sessionRole, sessionProjectId);
      }
    }
  }, [context]);

  return context;
};
