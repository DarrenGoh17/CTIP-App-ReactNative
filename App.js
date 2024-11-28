import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FooterNavigation from './components/FooterNavigation';
import { AuthProvider } from './backend/AuthContext'; // Import the AuthContext

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <FooterNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
