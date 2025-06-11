import { useState } from 'react';
import { useEffect } from 'react';

export const login = async (email: string, password: string) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.user;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token');
};


interface User {
  role: string;
  [key: string]: any; // Allow additional user properties
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  return { user };
};
// utils/auth.js

// This function gets user data from localStorage (for frontend apps)
export function getUserData() {
  if (typeof window === 'undefined') return null; // 🚫 SSR-safe check

  const userData = localStorage.getItem('user');
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
}
