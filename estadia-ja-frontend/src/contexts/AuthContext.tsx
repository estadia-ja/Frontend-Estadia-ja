import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, userId: string, redirectTo?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Falha ao checar token:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string, userId: string, redirectTo: string = '/') => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    setIsLoggedIn(true);
    navigate(redirectTo);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
