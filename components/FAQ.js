import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import vector icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useTranslation } from 'react-i18next';

export default function FAQScreen() {
  const [expandedItem, setExpandedItem] = useState(null);
  const navigation = useNavigation(); // Get the navigation instance
  const { t } = useTranslation();

  const faqItems = [
    {
      id: 1,
      question: t('faq.openingHours'),
      answer: t('faq.openingHoursAnswer'),
    },
    {
      id: 2,
      question: t('faq.bestTimeToSee'),
      answer: t('faq.bestTimeToSeeAnswer'),
    },
    {
      id: 3,
      question: t('faq.ticketsInAdvance'),
      answer: t('faq.ticketsInAdvanceAnswer'),
    },
    {
      id: 4,
      question: t('faq.parkingAvailable'),
      answer: t('faq.parkingAvailableAnswer'),
    },
    {
      id: 5,
      question: t('faq.bringFoodDrinks'),
      answer: t('faq.bringFoodDrinksAnswer'),
    },
  ];

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
      >
        <Text style={styles.questionText}>{item.question}</Text>
        <Icon
          name={expandedItem === item.id ? 'expand-less' : 'expand-more'}
          size={24}
          color="#2f4f2f"
        />
      </TouchableOpacity>
      {expandedItem === item.id && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{item.answer}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#2f4f2f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('faq.headerTitle')}</Text>
      </View>

      <FlatList
        data={faqItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5e6', // Light background color
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
    marginRight: 100,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f4f2f',
    textAlign: 'center',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 16,
    color: '#2f4f2f',
    flex: 1,
    marginRight: 10,
  },
  answerContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  answerText: {
    fontSize: 14,
    color: '#2f4f2f',
  },
  separator: {
    height: 10,
  },
});

