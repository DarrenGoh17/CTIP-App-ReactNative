import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../AppStyles';
import { useTranslation } from 'react-i18next';

export default function PhotoSession({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.sessionContainer}>
      {/* Header Image and Back Button */}
      <View style={styles.headerSessionContainer}>
        <Image
          source={require('../assets/orangutan-photo-session.jpg')} // Replace with the correct path to your photo session image
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
        <Text style={styles.title}>{t('photoSession.title')}</Text>
        <Text style={styles.subtitle}>{t('photoSession.subtitle')}</Text>
        <Text style={styles.description}>
        {t('photoSession.description')}
        </Text>

        {/* Session Information */}
        <View style={styles.infoContainer}>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="access-time" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('photoSession.time')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="camera-alt" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('photoSession.duration')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="location-on" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('photoSession.location')}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
