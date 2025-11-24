import { useEffect, useState } from 'react';
import { getSavedUser, getSavedToken, subscribeAuth, login as loginService, logout as logoutService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved token session in MMKV
    const savedUser = getSavedUser();
    const savedToken = getSavedToken();
    
    if (savedUser && savedToken) {
      // Token session exists, restore user immediately
      setUser(savedUser);
      setLoading(false);
    }

    // Subscribe to auth changes
    const unsub = subscribeAuth((u) => {
      setUser(u);
      setLoading(false);
    });
    
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

  return { user, login, logout, loading };
};
