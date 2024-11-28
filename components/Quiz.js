import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../AppStyles';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; // Import axios to make API requests
import config from '../backend/config'; // Assuming config contains your backend URL
import { AuthContext } from '../backend/AuthContext';

export default function Quiz({ navigation }) {
  const { t } = useTranslation(); 
  const { userId } = React.useContext(AuthContext); // Get the userId from context

  // Function to handle quiz link click and update voucher
  const handleQuizLinkClick = async () => {
    try {
      // Open the quiz link
      Linking.openURL('https://quizizz.com/admin/quiz/66fcaf8476340e5b2df7bdee?modal=contentCreation&type=quiz&source=content-creation-modal');
      
      // Make an API call to update voucher_10 to true for the current user
      const response = await axios.post(`${config.API_BASE_URL}/user/${userId}/assign-voucher`, {
        voucherType: '10',
      });

      // Check response and show alert if successful
      if (response.status === 200) {
        Alert.alert(t('voucher.success.title'), t('voucher.success.message'));
      } else {
        Alert.alert('Error', 'Failed to assign voucher. Please try again.');
      }
    } catch (error) {
      console.error('Error during voucher update:', error);
      Alert.alert('Error', 'Failed to assign voucher. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.sessionContainer}>
      {/* Header Image and Back Button */}
      <View style={styles.headerSessionContainer}>
        <Image
          source={require('../assets/quiz.webp')}
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
        <Text style={styles.title}>{t('quiz.title')}</Text>
        <Text style={styles.description}>
          {t('quiz.description')}        
        </Text>

        {/* Session Information */}
        <View style={styles.infoContainer}>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="access-time" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('quiz.online')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="location-on" size={24} color="#000" style={styles.icon} />
            <Text style={styles.infoText}>{t('quiz.location')}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.infoRow}>
            <Icon name="link" size={24} color="#000" style={styles.icon} />
            <TouchableOpacity onPress={handleQuizLinkClick}>
              <Text style={[styles.infoText, { color: '#007BFF' }]}>
                {t('quiz.joinNow')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
