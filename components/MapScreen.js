import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import vector icons
import { useTranslation } from 'react-i18next';

export default function MapScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { t } = useTranslation();

  // Define your locations with x, y positions relative to the image, including the image path
  const locations = [
    {
      id: 1,
      name: t('map.mainEntrance'),
      x: 345, // Replace with actual x-coordinate
      y: 130, // Replace with actual y-coordinate
      image: require('../assets/main entrance.jpg'), // Replace with the actual image path
    },
    {
      id: 2,
      name: t('map.orangutanFeedingPlatform'),
      x: 155,
      y: 60,
      image: require('../assets/nature walk.webp'), // Replace with the actual image path
    },
    {
      id: 3,
      name: t('map.toilet'),
      x: 230,
      y: 170,
      image: require('../assets/toilet.jpeg'), // Replace with the actual image path
    },
    {
      id: 4,
      name: t('map.vetClinic'),
      x: 103,
      y: 185,
      image: require('../assets/clinic.jpeg'), // Replace with the actual image path
    },
    {
      id: 5,
      name: t('map.parking'),
      x: 240,
      y: 90,
      image: require('../assets/parking.webp'), // Replace with the actual image path
    },
    {
      id: 6,
      name: t('map.fireAssemblyPoint'),
      x: 60,
      y: 140,
      image: require('../assets/Fire Assembly Point.webp'), // Replace with the actual image path
    },
  ];

  return (
    <View style={[styles.container]}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{t('map.headerTitle')}</Text>
        <Text style={styles.headerDescription}>
        {t('map.headerDescription')}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Image
          source={require('../assets/feeding-map.webp')} // Replace with the actual map image path
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />

        {locations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={{
              position: 'absolute',
              top: location.y,
              left: location.x,
            }}
            onPress={() => setSelectedLocation(location)}
          >
            <Icon
              name="location-on" // Material icon for location
              size={30} // Adjust the size as needed
              color="red" // You can change the color to fit your design
            />
          </TouchableOpacity>
        ))}

        {selectedLocation && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={!!selectedLocation}
            onRequestClose={() => setSelectedLocation(null)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.locationName}>{selectedLocation.name}</Text>
                <Image
                  source={selectedLocation.image}
                  style={styles.locationImage}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedLocation(null)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5e6', // Set the entire container background color
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#f7f5e6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    color: '#000000'
  },
  headerDescription: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#000000'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationImage: {
    width: 250,
    height: 150,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
