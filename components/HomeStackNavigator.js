import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './Homepage';
import FeedingSession from './FeedingSession';
import NatureWalk from './NatureWalk';
import PhotoSession from './PhotoSession';
import GiftShop from './GiftShop';
import Rehabilitation from './Rehabilitation';
import Quiz from './Quiz';
import Conservation from './Conservation';
import Discover from './Discover';
import Donation from './Donation';
import Events from './Events';
import AnimalGallery from './AnimalGallery';
import Orangutan from './Orangutan';
import Crocodile from './Crocodile';
import Pig from './Pig';
import Sambar from './Sambar';
import Porcupine from './Porcupine';
import Argus from './Argus';

const HomeStack = createStackNavigator();

export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomePage" component={HomePage} />
      <HomeStack.Screen name="FeedingSession" component={FeedingSession} />
      <HomeStack.Screen name="NatureWalk" component={NatureWalk} />
      <HomeStack.Screen name="PhotoSession" component={PhotoSession} />
      <HomeStack.Screen name="GiftShop" component={GiftShop} />
      <HomeStack.Screen name="Rehabilitation" component={Rehabilitation} />
      <HomeStack.Screen name="Quiz" component={Quiz} />
      <HomeStack.Screen name="Conservation" component={Conservation} />
      <HomeStack.Screen name="Discover" component={Discover} />
      <HomeStack.Screen name="Donation" component={Donation} />
      <HomeStack.Screen name="Events" component={Events} />
      <HomeStack.Screen name="AnimalGallery" component={AnimalGallery} />
      <HomeStack.Screen name="Orangutan" component={Orangutan} />
      <HomeStack.Screen name="Crocodile" component={Crocodile} />
      <HomeStack.Screen name="Pig" component={Pig} />
      <HomeStack.Screen name="Sambar" component={Sambar} />
      <HomeStack.Screen name="Porcupine" component={Porcupine} />
      <HomeStack.Screen name="Argus" component={Argus} />
    </HomeStack.Navigator>
  );
}
