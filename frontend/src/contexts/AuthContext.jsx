import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token) {
      setLoading(false);
      return;
    }

    fetchUser(token, refreshToken);
  }, []);

  const fetchUser = async (token, refreshToken) => {

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setUser(result);
      } else {
        console.warn("Access token invalid or expired.");
        if (refreshToken) {
          const newTokens = await refreshAuthToken(refreshToken);
          if (newTokens) {
            await fetchUser(newTokens.accessToken, newTokens.refreshToken);
          } else {
            logout();
          }
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAuthToken = async (refreshToken) => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Refresh token invalid:", responseData);
        return null;
      }

      const { accessToken, refreshToken: newRefreshToken } = responseData;

      if (!accessToken || !newRefreshToken) {
        console.error("Invalid refresh response:", responseData);
        return null;
      }

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { accessToken, refreshToken, user } = await response.json();
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      return response.ok;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
