import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const Events = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const options = [
    {
      title: t('home.whats_happening.rehabilitation'),
      image: require('../assets/orangutan-rehabilitation.webp'), // Replace with the correct image path
      screen: 'Rehabilitation', // Screen to navigate to
    },
    {
      title: t('home.whats_happening.quiz'),
      image: require('../assets/quiz-event.webp'), // Replace with the correct image path
      screen: 'Quiz', // Screen to navigate to
    },
    {
      title: t('home.whats_happening.conservation'),
      image: require('../assets/conservation.webp'), // Replace with the correct image path
      screen: 'Conservation', // Screen to navigate to
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('home.whats_happening.title')}</Text>
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

export default Events;
