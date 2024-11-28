// FooterNavigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeStackNavigator } from './HomeStackNavigator';
import MapScreen from './MapScreen';
import { MoreStackNavigator } from './MoreStackNavigator';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function FooterNavigation() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'More') {
            iconName = 'more-horiz';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: 'lightgray',
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator} // Use HomeStackNavigator here
        options={{ 
          headerShown: false,
          tabBarLabel: t('footer.home') // Translated label for Home
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen} // Link to MapScreen here
        options={{ 
          headerShown: true,
          tabBarLabel: t('footer.map') // Translated label for Map
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigator}
        options={{ 
          headerShown: false,
          tabBarLabel: t('footer.more') // Translated label for More
        }}
      />
    </Tab.Navigator>
  );
}
