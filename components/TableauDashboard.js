import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const TableauDashboard = () => {
  const navigation = useNavigation();

  const tableauURL = 'https://public.tableau.com/shared/QXPWQWZKJ?:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true&:language=en-US';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#2f4f2f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tableau Dashboard</Text>
      </View>

      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: tableauURL }}
          style={styles.webview}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5e6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 10,
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f4f2f',
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },

});

export default TableauDashboard;
