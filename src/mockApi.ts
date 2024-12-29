// src/api/mockApi.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUsers = async () => {
  const storedUsers = await AsyncStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

export const registerUser = async (email: string, password: string) => {
  const users = await getUsers();
  const existingUser = users.find((user: { email: string }) => user.email === email);

  if (existingUser) {
    throw new Error('Email already exists');
  }

  users.push({ email, password });
  await AsyncStorage.setItem('users', JSON.stringify(users));
};

export const setLoggedInUser = async (user: { email: string; password: string }) => {
  await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
};
