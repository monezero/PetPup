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
            fontSize: 12,
            color: 'black',
          },
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
