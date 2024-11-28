import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n from '../i18n'; 
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export default function AppSetting() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [language, setLanguage] = useState(i18n.language); // Set initial language to the current language

  useEffect(() => {
    i18n.changeLanguage(language); // Change the language globally when the language state changes
  }, [language]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon onPress={() => navigation.goBack()} name="arrow-back" size={28} color="#2f4f2f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('appSettings.title')}</Text>
      </View>

      <RNPickerSelect
        onValueChange={(value) => setLanguage(value)} // Update language on selection
        items={[
          { label: t('appSettings.languages.english'), value: 'en' },
          { label: t('appSettings.languages.chinese'), value: 'cn' },
          { label: t('appSettings.languages.bahasaMelayu'), value: 'bm' },
        ]}
        value={language}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon={() => <Icon name="arrow-drop-down" size={24} color="black" paddingTop={10} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
