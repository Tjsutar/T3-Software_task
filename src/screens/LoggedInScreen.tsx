import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSalesData, getLeadsData } from '../mockApi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Sale {
  id: string;
  name: string;
  date: string;
  customer: string;
  amount: number;
}

interface Lead {
  id: string;
  name: string;
  status: string;
  contact: string;
}

const LoggedInScreen = ({ navigation }: { navigation: any }) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await AsyncStorage.getItem('loggedInUser');
      if (user) {
        const email = JSON.parse(user).email;
        const username = email.split('@')[0];
        setLoggedInUser(username);
      }
    };

    fetchLoggedInUser();

    const loadData = async () => {
      const salesData = await getSalesData();
      const leadsData = await getLeadsData();
      setSales(salesData);
      setLeads(leadsData);
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    navigation.navigate('Home');
  };

  const SalesLeadItem = ({ item }: { item: Sale }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemSubtitle}>{item.date}</Text>
      <Text style={styles.itemAmount}>${item.amount}</Text>
    </View>
  );

  const LeadItem = ({ item }: { item: Lead }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={[styles.itemSubtitle, item.status === 'Hot' ? styles.hotStatus : null]}>
        {item.status}
      </Text>
      <Text style={styles.itemSubtitle}>{item.contact}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Modern Logout Button at Top Right Corner */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Icon name="logout" size={28} color="white" />
      </TouchableOpacity>
      <Text style={styles.welcomeText}>Welcome, {loggedInUser}</Text>
      <View style={styles.contentContainer}>
        

        <Text style={styles.sectionTitle}>Sales Data</Text>
        <FlatList
          data={sales}
          keyExtractor={(item) => item.id}
          renderItem={SalesLeadItem}
          style={styles.list}
        />

        <Text style={styles.sectionTitle}>Leads Data</Text>
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          renderItem={LeadItem}
          style={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  // Modern logout button with clean design
  logoutButton: {
    position: 'absolute',
    top: 25,
    right: 24,
    zIndex: 1,
    backgroundColor: '#EF4444', // Red background for visibility
    borderRadius: 50, // Make it round
    padding: 12, // Space for the icon
    elevation: 5, // Subtle shadow
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // Define the size
    height: 50, // Define the size
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  list: {
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  itemAmount: {
    fontSize: 16,
    color: '#4F46E5',
    marginTop: 6,
  },
  hotStatus: {
    color: 'red',
  },
});

export default LoggedInScreen;
