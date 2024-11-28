import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../AppStyles';
import { useTranslation } from 'react-i18next';

export default function Orangutan({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.sessionContainer}>
      {/* Header Image and Back Button */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/orang utan.webp')}
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
        <Text style={styles.title}>{t('orangutan.title')}</Text>
        <Text style={styles.description}>
        {t('orangutan.description')}
        </Text>

        {/* Session Information */}
        <View style={styles.infoContainer}>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="forest" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('orangutan.habitat')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="fastfood" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('orangutan.food')}</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
