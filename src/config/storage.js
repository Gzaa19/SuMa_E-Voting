let storage;
let isMMKV = false;
try {
  const { MMKV } = require('react-native-mmkv');
  const mmkv = new MMKV();
  isMMKV = true;
  storage = {
    getString: async (key) => {
      try {
        return mmkv.getString(key) ?? null;
      } catch (e) {
        throw e;
      }
    },
    set: async (key, value) => {
      try {
        mmkv.set(key, value);
      } catch (e) {
        throw e;
      }
    },
    delete: async (key) => {
      try {
        mmkv.delete(key);
      } catch (e) {
        throw e;
      }
    },
    getObject: async (key) => {
      const s = await storage.getString(key);
      return s ? JSON.parse(s) : null;
    },
    setObject: async (key, obj) => {
      return storage.set(key, JSON.stringify(obj));
    },
  };
} catch (e) {
  const SecureStore = require('expo-secure-store');
  storage = {
    getString: async (key) => SecureStore.getItemAsync(key),
    set: async (key, value) => SecureStore.setItemAsync(key, value),
    delete: async (key) => SecureStore.deleteItemAsync(key),
    getObject: async (key) => {
      const s = await SecureStore.getItemAsync(key);
      return s ? JSON.parse(s) : null;
    },
    setObject: async (key, obj) => SecureStore.setItemAsync(key, JSON.stringify(obj)),
  };
}

export { storage, isMMKV };