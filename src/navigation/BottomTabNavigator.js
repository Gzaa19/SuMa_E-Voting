import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import VotingScreen from '../screens/VotingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../hooks/useAuth';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function LogoutScreen() {
  const { logout } = useAuth();
  useFocusEffect(
    React.useCallback(() => {
      logout();
    }, [logout])
  );
  return <View />;
}

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  const ICON_SIZE = 28;

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1e88e5',
        tabBarInactiveTintColor: '#777',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: '#fff',
          elevation: 8,
          paddingTop: 8,
          paddingBottom: insets.bottom + 8,
          height: 60 + insets.bottom,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ color }) => {
          const s = ICON_SIZE; 
          if (route.name === 'Vote') return <Ionicons name="checkmark-done-circle" size={s} color={color} />;
          if (route.name === 'Profile') return <Ionicons name="person-circle" size={s} color={color} />;
          if (route.name === 'Logout') return <Ionicons name="log-out" size={s} color={color} />;
          return null;
        },
      })}
    >
      <Tab.Screen name="Vote" component={VotingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Logout" component={LogoutScreen} />
    </Tab.Navigator>
  );
}