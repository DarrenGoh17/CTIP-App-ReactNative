import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import config from '../backend/config';
import { AuthContext } from '../backend/AuthContext';

export default function Voucher() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { userId } = useContext(AuthContext);
  
  const [showAlert, setShowAlert] = useState(false);
  const [voucherTypeToRedeem, setVoucherTypeToRedeem] = useState(null); // Track which voucher to redeem
  const [voucher20Available, setVoucher20Available] = useState(false);
  const [voucher10Available, setVoucher10Available] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVoucherStatus();
  }, []);

  const fetchVoucherStatus = async () => {
    try {
        setLoading(true);
        const response = await axios.get(`${config.API_BASE_URL}/user/${userId}/voucher-status`);
        const data = response.data;

        // Log the voucher status
        console.log('Voucher Status:', data);

        setVoucher20Available(data.voucher_20 && !data.voucher_20_redeem);
        setVoucher10Available(data.voucher_10 && !data.voucher_10_redeem);
    } catch (error) {
        console.error('Error fetching voucher status:', error);
        Alert.alert('Error', 'Failed to fetch voucher status. Please try again later.');
    } finally {
        setLoading(false);
    }
  };

  const handleVoucherClick = (type) => {
    if (type === '20' && voucher20Available) {
      setVoucherTypeToRedeem('20');
      setShowAlert(true);
    } else if (type === '10' && voucher10Available) {
      setVoucherTypeToRedeem('10');
      setShowAlert(true);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(`${config.API_BASE_URL}/user/${userId}/redeem-voucher`, {
        voucherType: voucherTypeToRedeem,
      });
      
      // If redemption is successful, update the state and show a success alert
      if (response.status === 200) {
        Alert.alert(t('voucher.success.title'), t('voucher.success.message'));
        if (voucherTypeToRedeem === '20') {
          setVoucher20Available(false); // Update only on successful redemption
        } else if (voucherTypeToRedeem === '10') {
          setVoucher10Available(false);
        }
      } else {
        throw new Error('Redemption failed'); // This will go to catch block
      }
      setShowAlert(false);
    } catch (error) {
      console.error('Error redeeming voucher:', error);
      Alert.alert('Error', 'Failed to redeem voucher. Please try again.');
      setShowAlert(false);
    }
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2f4f2f" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#2f4f2f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('voucher.title')}</Text>
      </View>
      <Text style={styles.voucherText}>{t('voucher.instruction')}</Text>
      
      {/* Voucher 10% */}
      {voucher10Available ? (
        <>
          <TouchableOpacity onPress={() => handleVoucherClick('10')}>
            <Image
              source={require('../assets/10 percent.png')} // Assuming you have a separate image for voucher 1
              style={styles.voucherImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.hiddenText}>{t('voucher.noVoucher1')}</Text>
      )}

      {/* Voucher 20% */}
      {voucher20Available ? (
        <>
          <TouchableOpacity onPress={() => handleVoucherClick('20')}>
            <Image
              source={require('../assets/20 percent.png')}
              style={styles.voucherImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.hiddenText}>{t('voucher.noVoucher20')}</Text>
      )}

      {!voucher10Available && !voucher20Available && (
        <Text style={styles.redeemedText}>{t('voucher.noVouchers')}</Text>
      )}

      {/* Redeem Voucher Confirmation Alert */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={t('voucher.alert.title')}
        message={t('voucher.alert.message')}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={t('voucher.alert.cancel')}
        confirmText={t('voucher.alert.confirm')}
        confirmButtonColor="#4CAF50"
        cancelButtonColor="#DD6B55"
        onCancelPressed={handleCancel}
        onConfirmPressed={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f5e6',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f5e6',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f4f2f',
    textAlign: 'center',
    paddingLeft: 60,
  },
  voucherText: {
    fontSize: 16,
    color: '#2f4f2f',
    marginBottom: 20,
    textAlign: 'center',
  },
  voucherImage: {
    width: '100%',
  },
  redeemedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
    textAlign: 'center',
    marginTop: 50,
  },
  hiddenText: {
    opacity: 0,
  }
});
