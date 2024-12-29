import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../mockApi';  // Use the mockApi functions

// Validation Schema for Formik
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

// Function to calculate password strength
const getPasswordStrength = (password: string) => {
  let score = 0;

  // Check password length
  if (password.length >= 8) score += 1; 
  if (password.length >= 12) score += 1;

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) score += 1;

  // Check for numbers
  if (/\d/.test(password)) score += 1;

  // Check for special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  // Determine password strength
  if (score === 0) return { strength: 'Very Weak', color: 'red' };
  if (score === 1) return { strength: 'Weak', color: 'orange' };
  if (score === 2) return { strength: 'Medium', color: 'yellow' };
  if (score === 3) return { strength: 'Strong', color: 'green' };
  return { strength: 'Very Strong', color: 'green' };
};

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [passwordColor, setPasswordColor] = useState<string>('red');

  const handleRegister = async (values: { email: string; password: string }) => {
    try {
      await registerUser(values.email, values.password);  // Register user
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Registration failed.');
    }
  };

  const handlePasswordChange = (password: string) => {
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength.strength);
    setPasswordColor(strength.color);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
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
              onChangeText={(text) => {
                handleChange('password')(text);
                handlePasswordChange(text);  // Update password strength when password changes
              }}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Password Strength Indicator */}
            {values.password && (
              <View style={styles.passwordStrengthContainer}>
                <Text>Password Strength: {passwordStrength}</Text>
                <View
                  style={[
                    styles.passwordStrengthBar,
                    { width: `${(passwordStrength === 'Very Strong' ? 100 : passwordStrength === 'Strong' ? 80 : passwordStrength === 'Medium' ? 60 : 40)}%`, backgroundColor: passwordColor },
                  ]}
                />
              </View>
            )}

            <Button title="Sign Up" onPress={() => handleSubmit()} />
            <TouchableOpacity style={{ marginBlock: 15 }}>
              <Button title="Go to Sign In" onPress={() => navigation.navigate('Home')} color="green" />
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
    padding: 16
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
  passwordStrengthContainer: {
    marginBlock: 8,
  },
  passwordStrengthBar: {
    height: 5,
    marginTop: 4,
    borderRadius: 2,
  },
});

export default SignUpScreen;
