import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import config from '../backend/config';

export default function IoTDashboard() {
  const navigation = useNavigation();
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/sensor-readings`);
        console.log('Iot Dashboard fetched successfully.');
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor readings:', error);
      }
    };

    fetchSensorData();
  }, []);

  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#2f4f2f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>IoT Dashboard</Text>
      </View>
      <Text style={styles.title}>Sensor Readings</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeader, styles.tableCell]}>ID</Text>
          <Text style={[styles.tableHeader, styles.tableCell]}>Timestamp</Text>
          <Text style={[styles.tableHeader, styles.tableCell]}>Motion Status</Text>
          <Text style={[styles.tableHeader, styles.tableCell]}>Sound Value</Text>
          <Text style={[styles.tableHeader, styles.tableCell]}>Pressure Button Status</Text>
        </View>

        {/* Table Rows */}
        {sensorData.map((reading) => (
          <View key={reading.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{reading.id}</Text>
            <Text style={styles.tableCell}>{new Date(reading.timestamp).toLocaleString()}</Text>
            <Text style={styles.tableCell}>{reading.motion_status}</Text>
            <Text style={styles.tableCell}>{reading.sound_value}</Text>
            <Text style={styles.tableCell}>{reading.button_status}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
    paddingLeft: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
  },
});
