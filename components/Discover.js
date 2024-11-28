import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const Discover = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const options = [
    {
      title: t('home.things_to_do.feeding_session.title'), // Use translation for Feeding Session
      image: require('../assets/sumatra_orangutan_conservation.webp'), // Replace with the correct image path
      screen: 'FeedingSession', // Screen to navigate to
    },
    {
      title: t('home.things_to_do.nature_walk'), // Use translation for Nature Walk
      image: require('../assets/nature walk discover.webp'), // Replace with the correct image path
      screen: 'NatureWalk', // Screen to navigate to
    },
    {
      title: t('home.things_to_do.photo_session'), // Use translation for Photography Session
      image: require('../assets/photography.webp'), // Replace with the correct image path
      screen: 'PhotoSession', // Screen to navigate to
    },
    {
      title: t('home.things_to_do.souvenir_shop', 'Souvenir Shop'), // Add translation key for Souvenir Shop, default to 'Souvenir Shop'
      image: require('../assets/souveneir shop.webp'), // Replace with the correct image path
      screen: 'GiftShop', // Screen to navigate to
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {t('home.things_to_do.title')} {/* Translation for page title */}
        </Text>
      </View>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigation.navigate(option.screen)}
        >
          <Image source={option.image} style={styles.cardImage} />
          <View style={styles.overlay}>
            <Text style={styles.cardTitle}>{option.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5DC',
        padding: 10,
      },
      header: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      },
      backButton: {
        marginRight: 10,
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      card: {
        marginBottom: 15,
        borderRadius: 20,
        overflow: 'hidden',
      },
      cardImage: {
        width: '100%',
        height: 150,
        borderRadius: 20,
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
      },
});

export default Discover;
