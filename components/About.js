import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { useTranslation } from 'react-i18next'; 

export default function About() {
  const navigation = useNavigation(); // Get navigation instance
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#2f4f2f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('about.title')}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/logo.webp')} // Replace with your actual logo path
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>{t('about.appName')}</Text>
        <Text style={styles.appVersion}>{t('about.version')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5e6', // Light background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 100,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f4f2f',
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f4f2f',
    textAlign: 'center',
  },
  appVersion:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    textAlign: 'center',
  }
});
