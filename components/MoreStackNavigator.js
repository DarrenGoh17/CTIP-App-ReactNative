import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FAQ from './FAQ';
import About from './About';
import Entry from './Entry';
import AdminDashboard from './AdminDashboard';
import TableauDashboard from './TableauDashboard';
import Voucher from './Voucher';
import More from './More';
import AppSetting from './AppSetting';
import Profile from './Profile';
import IoTDashboard from './IoTDashboard';

const MoreStack = createStackNavigator();

export function MoreStackNavigator() {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="More" component={More} />
      <MoreStack.Screen name="FAQ" component={FAQ} />
      <MoreStack.Screen name="About" component={About} />
      <MoreStack.Screen name="Entry" component={Entry} />
      <MoreStack.Screen name="AdminDashboard" component={AdminDashboard} />
      <MoreStack.Screen name="TableauDashboard" component={TableauDashboard} />
      <MoreStack.Screen name="Voucher" component={Voucher} />
      <MoreStack.Screen name="AppSetting" component={AppSetting} />
      <MoreStack.Screen name="Profile" component={Profile} />
      <MoreStack.Screen name="IoTDashboard" component={IoTDashboard} />
    </MoreStack.Navigator>
  );
}
