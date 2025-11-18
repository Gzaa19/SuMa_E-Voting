import { useEffect, useState } from 'react';
import { getSavedUser, subscribeAuth, login as loginService, logout as logoutService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = subscribeAuth((u) => setUser(u));
    const saved = getSavedUser();
    if (saved) setUser(saved);
    return () => unsub();
  }, []);

  const login = async (email, password) => {
    try {
      const u = await loginService(email, password);
      setUser(u);
      return u;
    } catch (e) {
      return null;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
    } catch {}
  };

  return { user, login, logout };
};
