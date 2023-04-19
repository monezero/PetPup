import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MainLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home/index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
          tabBarLabelStyle: {
            fontFamily: 'Roboto_700Bold',
            color: '#000',
            marginBottom: 10,
            letterSpacing: 0.5,
          },
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#fa2',
            borderTopWidth: 0,
            bottom: 18,
            borderRadius: 20,
            height: 60,
            right: 14,
            left: 14,
          },
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
