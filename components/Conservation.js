import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../AppStyles';
import { useTranslation } from 'react-i18next';

export default function Conservation({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.sessionContainer}>
      {/* Header Image and Back Button */}
      <View style={styles.headerSessionContainer}>
        <Image
          source={require('../assets/conservation.jpeg')}
          style={styles.headerImage}
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
        <Text style={styles.title}>{t('conservation.title')}</Text>
        <Text style={styles.subtitle}>{t('conservation.subtitle')}</Text>
        <Text style={styles.description}>
        {t('conservation.description')}
        </Text>

        {/* Session Information */}
        <View style={styles.infoContainer}>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="access-time" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('conservation.dateTime')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="location-on" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('conservation.location')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="link" size={24} color="#000" style={styles.icon} />
            <TouchableOpacity onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScBAmrZsD87exilusy6QC71ttDEiz-pPL-IHcwsnIQfskMhtQ/viewform?usp=sf_link')}>
            <Text style={[styles.infoText, { color: '#007BFF' }]}>
            {t('conservation.register')}
            </Text>
            </TouchableOpacity>
        </View>
        </View>
      </View>
    </ScrollView>
  );
}