// LoggedInScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoggedInScreen = ({ navigation }: { navigation: any }) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await AsyncStorage.getItem('loggedInUser');
      if (user) {
        setLoggedInUser(JSON.parse(user).email);
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {loggedInUser}</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LoggedInScreen;
