import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import config from '../backend/config';
import { AuthContext } from '../backend/AuthContext';

const qrImages = [
  { method: 'SPAY GLOBAL', amount: 5, src: require('../assets/SPAY5.png') },
  { method: 'SPAY GLOBAL', amount: 10, src: require('../assets/SPAY10.png') },
  { method: 'SPAY GLOBAL', amount: 20, src: require('../assets/SPAY20.png') },
  { method: 'SPAY GLOBAL', amount: 30, src: require('../assets/SPAY30.png') },
  { method: 'SPAY GLOBAL', amount: 50, src: require('../assets/SPAY50.png') },
  { method: 'SPAY GLOBAL', amount: 100, src: require('../assets/SPAY100.png') },
  { method: 'SPAY GLOBAL', amount: 'custom', src: require('../assets/SPAY-Custom.png') },
  { method: 'DuitNow', amount: 5, src: require('../assets/DuitNow.jpg') },
  { method: 'DuitNow', amount: 10, src: require('../assets/DuitNow.jpg') },
  { method: 'DuitNow', amount: 20, src: require('../assets/DuitNow.jpg') },
  { method: 'DuitNow', amount: 30, src: require('../assets/DuitNow.jpg') },
  { method: 'DuitNow', amount: 50, src: require('../assets/DuitNow.jpg') },
  { method: 'DuitNow', amount: 100, src: require('../assets/DuitNow.jpg') },
  { method: 'DuitNow', amount: 'custom', src: require('../assets/DuitNow.jpg') },
];

const Donation = ({ navigation }) => {
  const { t } = useTranslation();
  const { userId, token } = useContext(AuthContext);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  const handlePayNow = () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method to proceed.');
      return;
    }
  
    if (selectedAmount === 'custom' && (!customAmount || parseFloat(customAmount) <= 0)) {
      Alert.alert('Error', 'Please enter a valid custom amount.');
      return;
    } else if (!selectedAmount && !customAmount) {
      Alert.alert('Error', 'Please select an amount to proceed.');
      return;
    }
  
    setShowQrModal(true);
  };

  const getQrImage = () => {
    return qrImages.find((img) => img.method === selectedMethod && img.amount === (selectedAmount === 'custom' ? 'custom' : selectedAmount))?.src;
  };

  const handleDonation = async () => {
    const donatedAmount = selectedAmount === 'custom' ? parseFloat(customAmount) || 100 : selectedAmount;
    
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/user/${userId}/donate`,
        { donationAmount: donatedAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        Alert.alert(
          t('donation.successTitle'),
          t('donation.successMessage', { amount: donatedAmount }),
          [{ text: 'OK', onPress: () => navigation.navigate('HomePage', { donatedAmount }) }]
        );
        setShowQrModal(false);
      } else {
        Alert.alert('Error', response.data.error || 'Failed to process donation');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while processing your donation.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('donation.title')}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t('donation.paymentMethod')}</Text>
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[styles.methodButton, selectedMethod === 'SPAY GLOBAL' && styles.methodButtonActiveOrange]}
          onPress={() => setSelectedMethod('SPAY GLOBAL')}
        >
          <Text style={[styles.methodButtonText, selectedMethod === 'SPAY GLOBAL' && styles.methodButtonTextActive]}>
            SPAY GLOBAL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodButton, selectedMethod === 'DuitNow' && styles.methodButtonActiveBlue]}
          onPress={() => setSelectedMethod('DuitNow')}
        >
          <Text style={styles.methodButtonText}>
            <Text style={[styles.methodButtonText, selectedMethod === 'DuitNow' && styles.methodButtonTextActive]}>
              Duit
            </Text>
            <Text style={styles.methodButtonTextPink}>Now</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>{t('donation.amount')}</Text>
      <View style={styles.amountOptions}>
        {[5, 10, 20, 30, 50, 100].map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[styles.amountButton, selectedAmount === amount && styles.amountButtonActive]}
            onPress={() => {
              setSelectedAmount(amount);
              setCustomAmount('');
              setShowQrModal(false);
            }}
          >
            <Text style={[styles.amountButtonText, selectedAmount === amount && styles.amountButtonTextActive]}>
              RM {amount}.00
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.customAmountButton, selectedAmount === 'custom' && styles.amountButtonActive]}
          onPress={() => {
            setSelectedAmount('custom');
            setShowQrModal(false);
          }}
        >
          <Text style={[styles.amountButtonText, selectedAmount === 'custom' && styles.amountButtonTextActive]}>
            {t('donation.customAmount')}
          </Text>
        </TouchableOpacity>
      </View>

      {selectedAmount === 'custom' && (
        <View style={styles.customAmountInputContainer}>
          <Text style={styles.currencyPrefix}>RM</Text>
          <TextInput
            style={styles.customAmountInput}
            placeholder="Enter custom amount"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={setCustomAmount}
          />
        </View>
      )}

      <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
        <Text style={styles.payNowButtonText}>{t('donation.payNow')}</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={showQrModal} animationType="fade" onRequestClose={() => setShowQrModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: selectedMethod === 'DuitNow' ? '#3954A5' : '#ffa500' }]}>
            <Text style={styles.qrInstructionText}>
              {t('donation.qrInstruction', { method: selectedMethod })}
            </Text>
            {getQrImage() && <Image source={getQrImage()} style={styles.qrCode} />}

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowQrModal(false)}>
                <Text style={styles.buttonText}>{t('donation.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.doneButton} onPress={handleDonation}>
                <Text style={styles.buttonText}>{t('donation.done')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f7f5e6', 
    padding: 20 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 20 
  },
  backButton: { 
    marginRight: 10 
  },
  headerText: { 
    fontSize: 17, 
    fontWeight: 'bold' 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  paymentMethods: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  methodButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 15,
    marginHorizontal: 5,
    marginVertical: 7,
    borderRadius: 10,
    alignItems: 'center',
  },
  methodButtonActiveOrange: { 
    backgroundColor: '#ffa500' 
  },
  methodButtonActiveBlue: { 
    backgroundColor: '#3954A5' 
  },
  methodButtonText: { 
    fontSize: 16, 
    color: '#555', 
    fontWeight: 'bold' 
  },
  methodButtonTextActive: { 
    color: '#fff' 
  },
  methodButtonTextPink: { 
    fontSize: 16, 
    color: '#ff69b4', 
    fontWeight: 'bold' 
  },
  amountOptions: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginBottom: 20 
  },
  amountButton: {
    width: '48%',
    backgroundColor: '#EFEFEF',
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  amountButtonActive: { 
    backgroundColor: '#556632' 
  },
  amountButtonText: { 
    fontSize: 16, 
    color: '#555', 
    fontWeight: '700' 
  },
  amountButtonTextActive: { 
    color: '#fff', 
    fontWeight: '700' 
  },
  customAmountButton: {
    width: '100%',
    backgroundColor: '#EFEFEF',
    paddingVertical: 15,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  customAmountInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  customAmountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  currencyPrefix: {
    fontSize: 16,
    color: '#555',
    marginRight: 5,
  },
  payNowButton: {
    backgroundColor: '#6b8e23',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payNowButtonText: { 
    fontSize: 18, 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    width: 300, 
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  qrInstructionText: { 
    fontSize: 16, 
    marginBottom: 10, 
    textAlign: 'center', 
    color: '#fff' 
  },
  qrCode: { 
    width: 300, 
    height: 300, 
    resizeMode: 'contain' 
  },
  modalButtonsContainer: { 
    flexDirection: 'row', 
    marginTop: 20 
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f44336',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});

export default Donation;
