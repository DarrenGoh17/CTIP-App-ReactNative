import React, { useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useNavigation } from '@react-navigation/native'; 
import { AuthContext } from '../backend/AuthContext'; 
import { useTranslation } from 'react-i18next';

export default function More() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isAuthenticated, userRole, username, logout } = useContext(AuthContext); 

  const menuItems = [
    ...(isAuthenticated
      ? [
          {
            id: 1,
            name: username,
            icon: 'person',
            screen: 'Profile',
          },
          ...(userRole === 'admin'
            ? [
                {
                  id: 6,
                  name: t('more.adminDashboard'),
                  icon: 'dashboard',
                  screen: 'AdminDashboard',
                },
                {
                  id: 7,
                  name: t('more.tableauDashboard'),
                  icon: 'bar-chart',
                  screen: 'TableauDashboard',
                },
                {
                  id: 8,
                  name: t('more.iotDashboard'),
                  icon: 'sensors',
                  screen: 'IoTDashboard',
                }
              ]
            : [
                {
                  id: 9,
                  name: t('more.vouchers'),
                  icon: 'local-offer',
                  screen: 'Voucher',
                },
              ]),
        ]
      : []),
    {
      id: 2,
      name: t('more.faq'),
      icon: 'help-outline',
      screen: 'FAQ',
    },
    {
      id: 3,
      name: t('more.appSettings'),
      icon: 'settings',
      screen: 'AppSetting',
    },
    {
      id: 4,
      name: t('more.about'),
      icon: 'info-outline',
      screen: 'About',
    },
    {
      id: 5,
      name: isAuthenticated ? t('more.logout') : t('more.login'),
      icon: isAuthenticated ? 'logout' : 'login',
      screen: isAuthenticated ? null : 'Entry',
    },
  ];

  const handleMenuPress = (item) => {
    if (item.name === t('more.logout')) {
      logout(); // Log the user out and update the context
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleMenuPress(item)}
    >
      <View style={styles.menuItemContent}>
        <Icon name={item.icon} size={24} color="#2f4f2f" />
        <Text style={styles.menuItemText}>{item.name}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#c4c4c4" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.webp')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>{t('more.headerTitle')}</Text>
      </View>

      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 130,
    flex: 1,
    backgroundColor: '#f7f5e6', 
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 150,
    height: 80,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f4f2f',
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#2f4f2f',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});
