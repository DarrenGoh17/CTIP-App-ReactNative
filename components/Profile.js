import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, Platform, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import config from '../backend/config';
import { AuthContext } from '../backend/AuthContext';

export default function Profile() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { userId, username } = useContext(AuthContext);

  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
        setLoading(true);
        console.log('Fetching user details...');
        const response = await axios.get(`${config.API_BASE_URL}/user-details/${userId}`);
        if (response.status !== 200) {
            console.log('Unexpected status code:', response.status);
            Alert.alert('Failed to fetch user details, please try again later.');
            return;
        }
        const userData = response.data;
        console.log('User data fetched:', userData);
        setGender(userData.gender || 'Rather not say');
        setDateOfBirth(userData.date_of_birth ? new Date(userData.date_of_birth) : null);
        setSelectedAvatar(userData.avatar || 'monkey');
    } catch (error) {
        console.log('Error fetching user details:', error.message);
        Alert.alert('Error fetching user details');
    } finally {
        setLoading(false);
    }
  };

  const updateUserDetails = async () => {
    try {
      if (!dateOfBirth) {
        Alert.alert('Please select a date of birth');
        return;
      }
      const response = await axios.put(`${config.API_BASE_URL}/user-details/${userId}`, {
        dateOfBirth: dateOfBirth.toISOString().split('T')[0],
        gender,
        avatar: selectedAvatar,
      });
      Alert.alert(response.data.message);
      setIsEditing(false); // End editing mode after updating
    } catch (error) {
      Alert.alert('Error updating user details');
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const avatarImages = {
    monkey: require('../assets/monkey.webp'),
    mosquito: require('../assets/mosquito.webp'),
    bird: require('../assets/bird.webp'),
    snake: require('../assets/snake.webp'),
    deer: require('../assets/deer.webp'),
    cat: require('../assets/cat.webp'),
  };

  const avatarOptions = [
    { label: 'Monkey', value: 'monkey', image: require('../assets/monkey.webp') },
    { label: 'Mosquito', value: 'mosquito', image: require('../assets/mosquito.webp') },
    { label: 'Bird', value: 'bird', image: require('../assets/bird.webp') },
    { label: 'Snake', value: 'snake', image: require('../assets/snake.webp') },
    { label: 'Deer', value: 'deer', image: require('../assets/deer.webp') },
    { label: 'Cat', value: 'cat', image: require('../assets/cat.webp') },
  ];

  const renderAvatarItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelectedAvatar(item.value);
        setModalVisible(false);
      }}
    >
      <Image source={item.image} style={styles.avatarOptionImage} />
    </TouchableOpacity>
  );

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
        <TouchableOpacity style={styles.backButton}>
          <Icon onPress={() => navigation.goBack()} name="arrow-back" size={28} color="#2f4f2f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.title')}</Text>
        <TouchableOpacity style={styles.editContainer} onPress={() => setIsEditing(!isEditing)}>
          <Icon name="edit" size={20} color="#2f4f2f" style={styles.editIcon} />
          <Text style={styles.editButton}>{isEditing ? t('profile.edit') : t('profile.edit')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={avatarImages[selectedAvatar]} style={styles.avatar} />
        {isEditing && (
          <TouchableOpacity style={styles.avatarButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>{t('profile.avatar')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileItem}>
          <Text style={styles.label}>{t('profile.username')}:</Text>
          <Text style={styles.value}>{username}</Text>
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>{t('profile.DOB')}:</Text>
          <View style={styles.valueContainer}>
            {isEditing ? (
              <>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.value}>{formatDate(dateOfBirth) || t('profile.setDOB')}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={dateOfBirth || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                    maximumDate={new Date()}
                  />
                )}
              </>
            ) : (
              <Text style={styles.value}>{formatDate(dateOfBirth)}</Text>
            )}
          </View>
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>{t('profile.gender')}:</Text>
          {isEditing ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={gender}
                style={styles.picker}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label={t('profile.male')} value="Male" />
                <Picker.Item label={t('profile.female')} value="Female" />
                <Picker.Item label={t('profile.notSay')} value="Rather not say" />
              </Picker>
            </View>
          ) : (
            <Text style={styles.value}>{gender}</Text>
          )}
        </View>

        {isEditing && (
          <TouchableOpacity style={styles.updateButton} onPress={updateUserDetails}>
            <Text style={styles.buttonText}>{t('profile.update')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an Avatar</Text>
            <FlatList
              data={avatarOptions}
              renderItem={renderAvatarItem}
              keyExtractor={(item) => item.value}
              numColumns={3}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 70,
  },
  editIcon: {
    marginRight: 5,
  },
  editButton: {
    fontSize: 16,
    color: '#2f4f2f',
    fontWeight: 'bold',
  },
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
  avatarContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: 'black',
  },
  avatarButton: {
    backgroundColor: '#2f4f2f',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  profileContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f4f2f',
    width: '40%',
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#2f4f2f',
    textAlign: 'left', // Ensures the date is aligned to the left
  },
  pickerContainer: {
    width: '100%',
  },
  picker: {
    width: '100%',
    color: '#2f4f2f',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    alignItems: 'center',
  },
  avatarOptionImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  modalCloseButton: {
    backgroundColor: '#2f4f2f',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#2f4f2f',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});

