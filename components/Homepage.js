import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList, Animated, Dimensions, Modal } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../AppStyles';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Alert } from 'react-native';
import config from '../backend/config';
import { Video } from 'expo-av';
import { AuthContext } from '../backend/AuthContext';

const images = [
    { src: require('../assets/orang utan.webp'), name: 'Orangutan' },
    { src: require('../assets/crocodile.webp'), name: 'Crocodile' },
    { src: require('../assets/porcupine.webp'), name: 'Porcupine' },
    { src: require('../assets/bearded pig.jpeg'), name: 'Bearded Pig' },
    { src: require('../assets/sambar deer.webp'), name: 'Sambar Deer' },
    { src: require('../assets/great argus pheasant.jpg'), name: 'Great Argus Pheasant' },
];

const { width } = Dimensions.get('window');

const HomePage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // Donation State
  const [totalDonation, setTotalDonation] = useState(0); // Initialize with RM 0 as current donation
  const donationGoal = 10000; // Set the goal for the donation

  // Popup State
  const { isAuthenticated, userId} = useContext(AuthContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [nextFeedingTime, setNextFeedingTime] = useState("");

  const popups = [
    {
      type: 'feeding',
      title: 'Orangutan Feeding Session',
      video: require('../assets/feeding.mp4'),
      time: [nextFeedingTime],
    },
    {
      type: 'nature_walk',
      title: 'Nature Walk',
      image: require('../assets/nature walk popup.webp'),
      time: 'Explore the wild nature in Semenggoh Wildlife Centre',
    },
    {
      type: 'photography',
      title: 'Wildlife Photography Tips',
      image: require('../assets/photograpy popup.jpg'),
      time: 'Capturing a moment in the wild is like freezing a heartbeat of nature—raw, untamed, and bursting with life that tells a story.',
    },
  ];

  useEffect(() => {
    // Show pop-up only after login
    if (isAuthenticated) {
      fetchPreference();
    }
  }, [isAuthenticated]);

  const fetchPreference = async () => {
      try {
          const response = await axios.get(`${config.API_BASE_URL}/user-preference/${userId}`)
          const highestCountType = getHighestCountType(response.data);
          setPopupContent(getPopupContentByType(highestCountType)); // Set popup content based on preferences
          setIsPopupVisible(true);
      } catch (error) {
          Alert.alert('Error fetching user preference');
      }
  };

  const getHighestCountType = (preferences) => {
    const counts = {
      feeding: preferences.feeding_count,
      nature_walk: preferences.nature_walk_count,
      photography: preferences.photography_count,
    };
    
    const highestType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    return highestType;
  };

  const getPopupContentByType = (type) => {
    return popups.find((popup) => popup.type === type);
  };

  const updateUserPreference = async (type) => {
    try {
      const response = await axios.post(`${config.API_BASE_URL}/user-preference/${userId}`, { type });
      if (response.status === 200) {
        console.log('Preference updated successfully');
      }
    } catch (error) {
      console.error('Error updating user preference:', error);
      Alert.alert('Error', 'Could not update preference');
    }
  };
  

  // Handle new donations when navigating back to this screen
  useFocusEffect(
  React.useCallback(() => {
    const fetchTotalDonations = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/donations/total`);
        if (response.status === 200 && response.data?.totalDonation !== undefined) {
          setTotalDonation(response.data.totalDonation);
        } else {
          Alert.alert('Error', 'Failed to fetch total donations');
        }
      } catch (error) {
        console.error('Error fetching donations:', error.response || error);
        Alert.alert('Error', 'Please login or register an account for donation.');
      }
    };

    fetchTotalDonations();
  }, [])
);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  // Determine next feeding time based on current time
  useEffect(() => {
    const getNextFeedingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();

      if (currentHour < 9) {
        setNextFeedingTime("Next Feeding Time: 9:00 AM - 10:00 AM");
      } else if (currentHour < 10 && currentHour > 9) {
        setNextFeedingTime("Feeding Session Happening Now: 9:00 AM - 10:00 AM");
      } else if (currentHour < 15 && currentHour > 10) {
        setNextFeedingTime("Next Feeding Time: 3:00 PM - 4:00 PM");
      } else if (currentHour < 16 && currentHour > 15) {
        setNextFeedingTime("Feeding Session Happening Now: 3:00 PM - 4:00 PM");
      } else {
        setNextFeedingTime("9:00 AM");
      }
    };

    getNextFeedingTime();
  }, []);

  return (
    <View style={styles.container}>

      {/* Video Popup */}
      <Modal
        transparent
        visible={isPopupVisible}
        animationType="fade"
        onRequestClose={() => setIsPopupVisible(false)}
      >
        <View style={popupStyles.overlay}>
          <View style={popupStyles.popupContainer}>
            {/* Close Button */}
            <TouchableOpacity onPress={() => setIsPopupVisible(false)} style={popupStyles.closeButton}>
              <Icon name="close" size={20} color="#FFF" />
            </TouchableOpacity>
            
            <Text style={popupStyles.recentActivityTitle}>You might interested in</Text>
                  {popupContent ? (
              <>
                {popupContent?.video ? (
                <Video
                  source={popupContent.video}
                  style={popupStyles.popupVideo}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  useNativeControls
                />
              ) : (
                <Image
                  source={(popupContent.image)}
                  style={popupStyles.imageStyle}
                />
              )}
                <Text style={popupStyles.popupText}>{popupContent?.title}</Text>
                <Text style={popupStyles.popupTime}>{popupContent?.time}</Text>
              </>
            ) : (
              <Text style={popupStyles.popupText}>No relevant content available</Text>
            )}
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.scrollContent}>
        {/* Header Image with Title */}
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={require('../assets/orang utan bg 2.webp')}
          />
          <Text style={styles.headerText}>{t('home.header')}</Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          {[
            { name: t('home.nav.discover'), icon: 'binoculars', screen: 'Discover' },
            { name: t('home.nav.wildlife'), icon: 'elephant', screen: 'AnimalGallery' },
            { name: t('home.nav.events'), icon: 'calendar', screen: 'Events' },
            { name: t('home.nav.donation'), icon: 'cash', screen: 'Donation' },
          ].map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navButton}
              onPress={() => navigation.navigate(button.screen)}
            >
              <Icon name={button.icon} size={30} color="#4CAF50" />
              <Text style={styles.navText}>{button.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Things To Do Section */}
        <View style={styles.thingsToDo}>
          <Text style={styles.sectionTitle}>{t('home.things_to_do.title')}</Text>
          <TouchableOpacity style={styles.viewAll} onPress={() => navigation.navigate('Discover')}>
            <Text style={styles.viewAllText}>{t('home.things_to_do.view_all')} &gt;</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activities}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              updateUserPreference('feeding');
              navigation.navigate('FeedingSession');
            }}
          >
            <Image style={styles.cardImage} source={require('../assets/feeding-session.webp')} />
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTime}>{t('home.things_to_do.feeding_session.time')}</Text>
            </View>
            <Text style={styles.cardTitle}>{t('home.things_to_do.feeding_session.title')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              updateUserPreference('nature_walk');
              navigation.navigate('NatureWalk');
            }}
          >
            <Image style={styles.cardImage} source={require('../assets/nature walk.webp')} />
            <Text style={styles.cardTitle}>{t('home.things_to_do.nature_walk')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              updateUserPreference('photography');
              navigation.navigate('PhotoSession');
            }}
          >
            <Image style={styles.cardImage} source={require('../assets/photography.webp')} />
            <Text style={styles.cardTitle}>{t('home.things_to_do.photo_session')}</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>

        {/* What's Happening Section */}
        <View style={styles.thingsToDo}>
          <Text style={styles.sectionTitle}>{t('home.whats_happening.title')}</Text>
          <TouchableOpacity style={styles.viewAll} onPress={() => navigation.navigate('Events')}>
            <Text style={styles.viewAllText}>{t('home.things_to_do.view_all')} &gt;</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activities}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Rehabilitation')}>
              <Image style={styles.cardImage} source={require('../assets/orangutan-rehabilitation.webp')} />
              <Text style={styles.cardTitle}>{t('home.whats_happening.rehabilitation')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Quiz')}>
              <Image style={styles.cardImage} source={require('../assets/quiz-event.webp')} />
              <Text style={styles.cardTitle}>{t('home.whats_happening.quiz')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Conservation')}>
              <Image style={styles.cardImage} source={require('../assets/conservation.webp')} />
              <Text style={styles.cardTitle}>{t('home.whats_happening.conservation')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Animal Slider Section */}
        <GestureHandlerRootView style={sliderStyles.sliderRoot}>
          <View style={sliderStyles.sliderContainer}>
            <Text style={sliderStyles.sliderHeader}>{t('home.wildlife_animals')}</Text>
            <FlatList
              ref={flatListRef}
              data={images}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => {
                    switch (item.name) {
                      case 'Orangutan':
                        navigation.navigate('Orangutan');
                        break;
                      case 'Crocodile':
                        navigation.navigate('Crocodile');
                        break;
                      case 'Porcupine':
                        navigation.navigate('Porcupine');
                        break;
                      case 'Bearded Pig':
                        navigation.navigate('Pig');
                        break;
                      case 'Sambar Deer':
                        navigation.navigate('Sambar');
                        break;
                      case 'Great Argus Pheasant':
                        navigation.navigate('Argus');
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  <View style={sliderStyles.sliderImageContainer}>
                    <Image source={item.src} style={sliderStyles.sliderImage} />
                    <Text style={sliderStyles.sliderLabel}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )} 
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
            />
          </View>
        </GestureHandlerRootView>

        {/* Donation Box Section */}
        <Text style={donationStyles.donationTitle}>{t('home.donation_box.title')}</Text>
        <Text style={donationStyles.donationSubtitle}>{t('home.donation_box.subtitle')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Donation')}>
          <View style={donationStyles.donationContainer}>
            <View style={donationStyles.donationBox}>
              <Image style={donationStyles.donationImage} source={require('../assets/orangutan-donation.webp')} />
              <View style={donationStyles.donationInfo}>
                <Text style={donationStyles.donationText}>{t('home.donation_box.goal')}</Text>
                <View style={donationStyles.progressBarContainer}>
                  <View style={[donationStyles.progressBarFill, { width: `${(totalDonation / donationGoal) * 100}%` }]} />
                  <Text style={donationStyles.donationAmount}>RM {totalDonation}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};


const donationStyles = StyleSheet.create({
  donationContainer: {
    padding: 20,
    backgroundColor: '#7B9645',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  donationTitle: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  donationSubtitle: {
    paddingLeft: 20,
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  donationBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donationImage: {
    width: 120,
    height: 120,
    marginRight: 15,
  },
  donationInfo: {
    flex: 1,
  },
  donationText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 35,
  },
  progressBarContainer: {
    height: 25,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  donationAmount: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    color: '#333',
    fontWeight: 'bold',
  },
});

const popupStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    position: 'relative', // Allows positioning of the close button
  },
  popupVideo: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  imageStyle: {
    width: '100%', // This sets the default width
    maxWidth: 300, // Replace 300 with your desired max width value
    height: 200, // Optional: use this if you want to maintain aspect ratio automatically
    resizeMode: 'contain', // Ensures the image scales without stretching
  },
  popupText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  popupTime: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  recentActivityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
});

const sliderStyles = StyleSheet.create({
  sliderRoot: {
    height: 300, // Adjust height to make it a section of the HomePage
    width: '100%',
    marginBottom: 20,
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sliderImageContainer: {
    marginHorizontal: 1,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: '90%',
    height: 200, // Set a fixed height to keep the section compact
    borderRadius: 15,
  },
  sliderLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomePage;
