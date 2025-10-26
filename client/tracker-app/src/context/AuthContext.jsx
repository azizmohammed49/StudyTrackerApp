import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    // setToken(token);
  };

  const logout = () => {
    // localStorage.removeItem('token');
    // setToken('');
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
