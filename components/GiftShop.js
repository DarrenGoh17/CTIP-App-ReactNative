import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../AppStyles';
import { useTranslation } from 'react-i18next';

export default function GiftShop({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.sessionContainer}>
      {/* Header Image and Back Button */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/souveneir shop.webp')} // Replace with the correct path to your gift shop image
          style={styles.headerSessionImage}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.contentSessionContainer}>
        <Text style={styles.title}>{t('giftShop.title')}</Text>
        <Text style={styles.subtitle}>{t('giftShop.subtitle')}</Text>
        <Text style={styles.description}>
        {t('giftShop.description')}
        </Text>

        {/* Shop Information */}
        <View style={styles.infoContainer}>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="access-time" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('giftShop.time')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="location-on" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('giftShop.location')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="shopping-cart" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('giftShop.items')}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

