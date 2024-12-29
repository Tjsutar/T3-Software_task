// src/screens/SignInScreen.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Validation Schema for Formik
const validationSchema = Yup.object().shape({ 
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignInScreen = ({ navigation }: { navigation: any }) => {

  const handleLogin = async (values: { email: string; password: string }) => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find((user: { email: string; password: string }) => user.email === values.email);

    if (user && user.password === values.password) {
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
      navigation.navigate('LoggedIn');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'black'}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={[styles.input, { color: 'black' }]}
              placeholder="Password"
              placeholderTextColor={'black'}
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <Button title="Sign In" onPress={() => handleSubmit()} />
            <TouchableOpacity  style={{marginBlock:15}}>
            <Button title="Not Registered? Sign Up" onPress={() => navigation.navigate('Register')} color="green" />
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default SignInScreen;