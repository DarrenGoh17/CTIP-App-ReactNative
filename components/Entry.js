import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../backend/AuthContext';
import config from '../backend/config';

export default function Entry() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    signupUsername: '',
    signupEmail: '',
    signupPhoneNumber: '',
    signupPassword: '',
    confirmPassword: '',
    loginUsernameOrEmail: '',
    loginPassword: '',
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);

  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const { login } = useContext(AuthContext); // Use login from AuthContext
  const [isOtpForLogin, setIsOtpForLogin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({
      signupUsername: '',
      signupEmail: '',
      signupPhoneNumber: '',
      signupPassword: '',
      confirmPassword: '',
      loginUsernameOrEmail: '',
      loginPassword: '',
    });
    setErrors({});
  };

  const validateSignup = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.signupUsername) {
      errors.signupUsername = '*Required field';
    } else if (formData.signupUsername.length < 3) {
      errors.signupUsername = '*Username must be at least 3 characters long';
    }

    if (!formData.signupEmail) {
      errors.signupEmail = '*Required field';
    } else if (!emailRegex.test(formData.signupEmail)) {
      errors.signupEmail = '*Please enter a valid email';
    }

    if (!formData.signupPhoneNumber) {
      errors.signupPhoneNumber = '*Required field';
    } else if (!phoneRegex.test(formData.signupPhoneNumber)) {
      errors.signupPhoneNumber = '*Phone number must be 10-15 digits long';
    }

    if (!formData.signupPassword) {
      errors.signupPassword = '*Required field';
    } else if (!passwordRegex.test(formData.signupPassword)) {
      errors.signupPassword = '*Password must be at least 8 characters, contain letters, numbers, and special characters (@$!%*?&)';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = '*Required field';
    } else if (formData.signupPassword !== formData.confirmPassword) {
      errors.confirmPassword = '*Passwords do not match';
    }

    return errors;
  };

  // Request OTP
const handleRequestOtp = async () => {
  if (!formData.signupEmail) {
      return;
  }
  try {
      await axios.post(`${config.API_BASE_URL}/request-otp`, { email: formData.signupEmail });
      setIsOtpSent(true);
      Alert.alert('OTP Sent', 'Check your email for the OTP');
  } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to send OTP');
  }
};

  const validateLogin = () => {
    let errors = {};
    if (!formData.loginUsernameOrEmail) {
      errors.loginUsernameOrEmail = '*Required field';
    }
    if (!formData.loginPassword) {
      errors.loginPassword = '*Required field';
    }
    return errors;
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignup();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true); // Show spinner
    try {
      await axios.post(`${config.API_BASE_URL}/request-otp`, { email: formData.signupEmail });
      setIsOtpSent(true);
      setIsOtpForLogin(false);
      setIsOtpModalVisible(true);
      Alert.alert('OTP Sent', 'Please check your email for the OTP');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to send OTP');
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };
  
  const handleLogin = async () => {
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true); // Show spinner
    try {
      const loginResponse = await axios.post(`${config.API_BASE_URL}/login`, {
        usernameOrEmail: formData.loginUsernameOrEmail,
        password: formData.loginPassword,
      });
      const { email } = loginResponse.data;
      setUserEmail(email);
      await axios.post(`${config.API_BASE_URL}/request-otp`, { email });
      setIsOtpSent(true);
      setIsOtpForLogin(true);
      setIsOtpModalVisible(true);
      Alert.alert('OTP Sent', 'Please check your email for the OTP');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to send OTP');
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };
  

  const handleVerifyOtp = async () => {
    if (!otpCode) {
      Alert.alert('Validation Error', 'Please enter the OTP');
      return;
    }
    setIsLoading(true); // Show spinner
    try {
      const emailForVerification = isOtpForLogin ? userEmail : formData.signupEmail;
      await axios.post(`${config.API_BASE_URL}/verify-otp`, {
        email: emailForVerification,
        otpCode,
      });
      if (!isOtpForLogin) {
        await axios.post(`${config.API_BASE_URL}/signup`, {
          username: formData.signupUsername,
          email: formData.signupEmail,
          phoneNumber: formData.signupPhoneNumber,
          password: formData.signupPassword,
        });
        Alert.alert('Registration Successful', 'Your account has been created.');
        setIsOtpModalVisible(false);
        toggleForm();
      } else {
        const loginResponse = await axios.post(`${config.API_BASE_URL}/login`, {
          usernameOrEmail: formData.loginUsernameOrEmail,
          password: formData.loginPassword,
        });
        const { role, username, id } = loginResponse.data;
        Alert.alert('Login successful!', '', [
          {
            text: 'OK',
            onPress: () => {
              login(role, username, id);
              navigation.navigate('More');
              navigation.navigate('Home');
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };
  

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )}

      {/* Return/Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.title}>{isSignup ? 'Register' : 'Login'}</Text>
        {isSignup ? (
          <>
            <TextInput
              style={[styles.input, errors.signupUsername && styles.errorInput]}
              placeholder="Username"
              value={formData.signupUsername}
              onChangeText={(value) => handleInputChange('signupUsername', value)}
            />
            <Text style={styles.errorText}>{errors.signupUsername}</Text>

            <TextInput
              style={[styles.input, errors.signupEmail && styles.errorInput]}
              placeholder="Email"
              value={formData.signupEmail}
              onChangeText={(value) => handleInputChange('signupEmail', value)}
            />
            <Text style={styles.errorText}>{errors.signupEmail}</Text>

            <TextInput
              style={[styles.input, errors.signupPhoneNumber && styles.errorInput]}
              placeholder="Phone Number"
              value={formData.signupPhoneNumber}
              onChangeText={(value) => handleInputChange('signupPhoneNumber', value)}
              keyboardType="numeric"
            />
            <Text style={styles.errorText}>{errors.signupPhoneNumber}</Text>

            <TextInput
              style={[styles.input, errors.signupPassword && styles.errorInput]}
              placeholder="Password"
              value={formData.signupPassword}
              onChangeText={(value) => handleInputChange('signupPassword', value)}
              secureTextEntry
            />
            <Text style={styles.errorText}>{errors.signupPassword}</Text>

            <TextInput
              style={[styles.input, errors.confirmPassword && styles.errorInput]}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry
            />
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.toggleText} onPress={toggleForm}>
              Already have an account? Login
            </Text>
          </>
        ) : (
          <>
            <TextInput
              style={[styles.input, errors.loginUsernameOrEmail && styles.errorInput]}
              placeholder="Username/Email"
              value={formData.loginUsernameOrEmail}
              onChangeText={(value) => handleInputChange('loginUsernameOrEmail', value)}
            />
            <Text style={styles.errorText}>{errors.loginUsernameOrEmail}</Text>

            <TextInput
              style={[styles.input, errors.loginPassword && styles.errorInput]}
              placeholder="Password"
              value={formData.loginPassword}
              onChangeText={(value) => handleInputChange('loginPassword', value)}
              secureTextEntry
            />
            <Text style={styles.errorText}>{errors.loginPassword}</Text>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.toggleText} onPress={toggleForm}>
              Not registered?{' '}
              <Text style={styles.boldText}>Sign up now</Text>
            </Text>
          </>
        )}
      </View>
      
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.webp')} style={styles.logo} />
        <Text style={styles.headerTitle}>Semenggoh Wildlife Centre</Text>
      </View>

      {/* OTP Modal */}
<Modal
    animationType="slide"
    transparent={true}
    visible={isOtpModalVisible}
    onRequestClose={() => {
        setIsOtpModalVisible(false);
    }}
>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otpCode}
                onChangeText={(value) => setOtpCode(value)}
                keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsOtpModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.verifyButton]}
                onPress={handleVerifyOtp} // Your OTP verification function
              >
                <Text style={styles.buttonText}>Verify</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    zIndex: 999, // Ensure it overlays other content
  },  
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f5e6',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  formContainer: {
    width: '100%',
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  toggleText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#2f4f2f',
  },
  boldText: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f4f2f',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
  },
  modalTitle: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons side by side
    justifyContent: 'space-between', // Space buttons evenly
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#f44336', // Red for Cancel
  },
  verifyButton: {
    backgroundColor: '#4CAF50', // Green for Verify
  },
});