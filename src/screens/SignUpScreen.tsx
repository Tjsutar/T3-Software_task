// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { registerUser } from '../mockApi';  // Use the mockApi functions

// // Validation Schema for Formik
// const validationSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email format').required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

// // Function to calculate password strength
// const getPasswordStrength = (password: string) => {
//   let score = 0;

//   // Check password length
//   if (password.length >= 8) score += 1; 
//   if (password.length >= 12) score += 1;

//   // Check for uppercase letters
//   if (/[A-Z]/.test(password)) score += 1;

//   // Check for numbers
//   if (/\d/.test(password)) score += 1;

//   // Check for special characters
//   if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

//   // Determine password strength
//   if (score === 0) return { strength: 'Very Weak', color: 'red' };
//   if (score === 1) return { strength: 'Weak', color: 'orange' };
//   if (score === 2) return { strength: 'Medium', color: 'yellow' };
//   if (score === 3) return { strength: 'Strong', color: 'green' };
//   return { strength: 'Very Strong', color: 'green' };
// };

// const SignUpScreen = ({ navigation }: { navigation: any }) => {
//   const [passwordStrength, setPasswordStrength] = useState<string>('');
//   const [passwordColor, setPasswordColor] = useState<string>('red');

//   const handleRegister = async (values: { email: string; password: string }) => {
//     try {
//       await registerUser(values.email, values.password);  // Register user
//       Alert.alert('Success', 'User registered successfully!');
//       navigation.navigate('Home');
//     } catch (error: any) {
//       Alert.alert('Error', error.message || 'Registration failed.');
//     }
//   };

//   const handlePasswordChange = (password: string) => {
//     const strength = getPasswordStrength(password);
//     setPasswordStrength(strength.strength);
//     setPasswordColor(strength.color);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Sign Up</Text>
//       <Formik
//         initialValues={{ email: '', password: '' }}
//         validationSchema={validationSchema}
//         onSubmit={handleRegister}
//       >
//         {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//           <>
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor={'black'}
//               value={values.email}
//               onChangeText={handleChange('email')}
//               onBlur={handleBlur('email')}
//             />
//             {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

//             <TextInput
//               style={[styles.input, { color: 'black' }]}
//               placeholder="Password"
//               placeholderTextColor={'black'}
//               secureTextEntry
//               value={values.password}
//               onChangeText={(text) => {
//                 handleChange('password')(text);
//                 handlePasswordChange(text);  // Update password strength when password changes
//               }}
//               onBlur={handleBlur('password')}
//             />
//             {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

//             {/* Password Strength Indicator */}
//             {values.password && (
//               <View style={styles.passwordStrengthContainer}>
//                 <Text>Password Strength: {passwordStrength}</Text>
//                 <View
//                   style={[
//                     styles.passwordStrengthBar,
//                     { width: `${(passwordStrength === 'Very Strong' ? 100 : passwordStrength === 'Strong' ? 80 : passwordStrength === 'Medium' ? 60 : 40)}%`, backgroundColor: passwordColor },
//                   ]}
//                 />
//               </View>
//             )}

//             <Button title="Sign Up" onPress={() => handleSubmit()} />
//             <TouchableOpacity style={{ marginBlock: 15 }}>
//               <Button title="Go to Sign In" onPress={() => navigation.navigate('Home')} color="green" />
//             </TouchableOpacity>
//           </>
//         )}
//       </Formik>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//   },
//   passwordStrengthContainer: {
//     marginBlock: 8,
//   },
//   passwordStrengthBar: {
//     height: 5,
//     marginTop: 4,
//     borderRadius: 2,
//   },
// });

// export default SignUpScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { registerUser } from '../mockApi';  // Ensure this is properly implemented

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

// Password Strength Calculator
const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  if (score === 0) return { strength: 'Very Weak', color: 'red', width: '20%' };
  if (score === 1) return { strength: 'Weak', color: 'orange', width: '40%' };
  if (score === 2) return { strength: 'Medium', color: 'yellow', width: '60%' };
  if (score === 3) return { strength: 'Strong', color: 'green', width: '80%' };
  return { strength: 'Very Strong', color: 'green', width: '100%' };
};

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 'Very Weak',
    color: '#EF4444',
    width: '20%',
  });

  const handleRegister = async (values: { email: string; password: string }) => {
    try {
      console.log('Registering user with values:', values);
      const response = await registerUser(values.email, values.password);
      console.log('API Response:', response);
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('Home'); // Navigate to Home screen
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed.';
      Alert.alert('Error', errorMessage); // Show error alert
    }
  };
  

  const handlePasswordChange = (password: string) => {
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/auth-icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our community</Text>
      </View>

      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Icon name="email-outline" size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="john.doe@example.com"
                  placeholderTextColor="#9CA3AF"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {touched.email && errors.email && (
                <View style={styles.errorContainer}>
                  <Icon name="alert-circle" size={14} color="#EF4444" />
                  <Text style={styles.errorText}>{errors.email}</Text>
                </View>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock-outline" size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={values.password}
                  onChangeText={(text) => {
                    handleChange('password')(text);
                    handlePasswordChange(text);
                  }}
                  onBlur={handleBlur('password')}
                />
              </View>
              <View style={styles.passwordStrengthContainer}>
                <View style={[styles.strengthBar, { 
                  // width: passwordStrength.width,
                  backgroundColor: passwordStrength.color 
                }]} />
                <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                  {passwordStrength.strength}
                </Text>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock-check" size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                />
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <View style={styles.errorContainer}>
                  <Icon name="alert-circle" size={14} color="#EF4444" />
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                </View>
              )}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.primaryButton, !isValid && styles.disabledButton]}
              onPress={()=>handleSubmit()}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Create Account</Text>
              <Icon name="arrow-right" size={20} color="white" />
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>
                Already have an account? <Text style={styles.linkText}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    color: '#111827',
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginLeft: 4,
  },
  passwordStrengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  strengthBar: {
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 24,
  },
  secondaryButtonText: {
    color: '#6B7280',
    textAlign: 'center',
  },
  linkText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});

export default SignUpScreen;
