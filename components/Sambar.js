import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../AppStyles';
import { useTranslation } from 'react-i18next';

export default function Sambar({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.sessionContainer}>
      {/* Header Image and Back Button */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/sambar deer.webp')}
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
        <Text style={styles.title}>{t('sambar.title')}</Text>
        <Text style={styles.description}>
        {t('sambar.description')}
        </Text>

        {/* Session Information */}
        <View style={styles.infoContainer}>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="forest" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('sambar.habitat')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="fastfood" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('sambar.food')}</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
