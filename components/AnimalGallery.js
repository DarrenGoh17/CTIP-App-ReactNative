import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const images = [
  { src: require('../assets/orang utan.webp'), name: 'home.animals.orangutan' },
  { src: require('../assets/crocodile.webp'), name: 'home.animals.crocodile' },
  { src: require('../assets/porcupine.webp'), name: 'home.animals.porcupine' },
  { src: require('../assets/bearded pig.jpeg'), name: 'home.animals.bearded_pig' },
  { src: require('../assets/sambar deer.webp'), name: 'home.animals.sambar_deer' },
  { src: require('../assets/great argus pheasant.jpg'), name: 'home.animals.great_argus_pheasant' },
];

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 20; // Width of each item, with margin adjustment

export default function ImageGallery({ navigation }) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('home.animals.title')}</Text>
      </View>

      {/* Image Grid */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.src} style={styles.image} />
            <Text style={styles.imageName}>{t(item.name)}</Text>
          </View>
        )}
        numColumns={2} // Display 2 items in each row
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 10,
    backgroundColor: '#f7f7f7',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingVertical: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  imageName: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
