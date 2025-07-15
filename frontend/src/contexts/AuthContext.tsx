import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "@/types";
import api from "@/lib/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      // Try to use saved user data first, fallback to decoding token
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
        } catch {
          // If saved user data is invalid, decode from token
          const userData = decodeToken(savedToken);
          if (userData) {
            setUser(userData);
            setToken(savedToken);
            localStorage.setItem("user", JSON.stringify(userData));
          }
        }
      } else {
        // No saved user data, decode from token
        const userData = decodeToken(savedToken);
        if (userData) {
          setUser(userData);
          setToken(savedToken);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      }
    }
    setIsLoading(false);
  }, []);

  const decodeToken = (token: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      };
    } catch {
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/app/auth/login", { email, password });
      const { token: authToken } = response.data;

      const userData = decodeToken(authToken);
      if (!userData) {
        throw new Error("Invalid token");
      }

      setToken(authToken);
      setUser(userData);
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch {
      throw new Error("Login failed");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await api.post("/app/auth/register", { name, email, password });
      // Registration successful, now login with the same credentials
      await login(email, password);
    } catch {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
