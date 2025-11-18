import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'suma-evoting-storage',
  encryptionKey: 'suma-2024-secure-key',
});

// ========== SET METHODS ==========

// Set user object (serialize to JSON)
export const setUser = (user) => {
  storage.set('user', JSON.stringify(user));
};

// Set auth token
export const setToken = (token) => {
  storage.set('token', token);
};

// Set onboarding status
export const setOnboardingComplete = (value) => {
  storage.set('onboarding-complete', value);
};

// Set has voted status
export const setHasVoted = (value) => {
  storage.set('has-voted', value);
};

// ========== GET METHODS ==========

// Get user object (deserialize from JSON)
export const getUser = () => {
  const user = storage.getString('user');
  return user ? JSON.parse(user) : null;
};

// Get auth token
export const getToken = () => {
  return storage.getString('token') ?? null;
};

// Get onboarding status
export const getOnboardingComplete = () => {
  return storage.getBoolean('onboarding-complete') ?? false;
};

// Get has voted status
export const getHasVoted = () => {
  return storage.getBoolean('has-voted') ?? false;
};

// ========== KEYS UTILITY ==========

// Check if user key exists
export const hasUser = () => {
  return storage.contains('user');
};

// Get all keys
export const getAllKeys = () => {
  return storage.getAllKeys();
};

// ========== REMOVE METHODS ==========

// Remove user
export const removeUser = () => {
  storage.delete('user');
};

// Remove token
export const removeToken = () => {
  storage.delete('token');
};

// Remove specific key
export const removeKey = (key) => {
  storage.delete(key);
};

// ========== CLEAR ALL ==========

// Clear all storage data
export const clearAll = () => {
  storage.clearAll();
};