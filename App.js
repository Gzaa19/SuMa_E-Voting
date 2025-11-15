import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { useAuth } from './src/hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

export default function App() {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState('login');

  const renderContent = () => {
    if (user) {
      return (
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      );
    }
    if (authMode === 'login') {
      return <LoginScreen onSwitchToRegister={() => setAuthMode('register')} />;
    } else {
      return <RegisterScreen onSwitchToLogin={() => setAuthMode('login')} />;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {renderContent()}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});