import { useState } from 'react';

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

// utils/auth.js

// This function gets user data from localStorage (for frontend apps)
export function getUserData() {
  const userData = localStorage.getItem('user');

  if (!userData) {
    return null; // No user logged in
  }

  try {
    return JSON.parse(userData); // Convert string back to object
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
}
