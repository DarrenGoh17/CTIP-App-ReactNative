import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../AppStyles';
import { useTranslation } from 'react-i18next';

export default function Rehabilitation({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.sessionContainer}>
      {/* Header Image and Back Button */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/rehabilitation.jpg')}
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
        <Text style={styles.title}>{t('rehabilitation.title')}</Text>
        <Text style={styles.subtitle}>{t('rehabilitation.subtitle')}</Text>
        <Text style={styles.description}>
        {t('rehabilitation.description')}
        </Text>

        {/* Session Information */}
        <View style={styles.infoContainer}>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="access-time" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('rehabilitation.dateTime')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="location-on" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('rehabilitation.location')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="link" size={24} color="#000" style={styles.icon} />
            <TouchableOpacity onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScBAmrZsD87exilusy6QC71ttDEiz-pPL-IHcwsnIQfskMhtQ/viewform?usp=sf_link')}>
            <Text style={[styles.infoText, { color: '#007BFF' }]}>
            {t('rehabilitation.register')}
            </Text>
            </TouchableOpacity>
        </View>
        </View>
      </View>
    </ScrollView>
  );
}
