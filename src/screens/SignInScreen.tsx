// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {green} from 'react-native-reanimated/lib/typescript/Colors';
// import {VELOCITY_EPS} from 'react-native-reanimated/lib/typescript/animation/decay/utils';

// // Validation Schema for Formik
// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email format')
//     .required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

// const SignInScreen = ({navigation}: {navigation: any}) => {
//   // Handle login logic
//   const handleLogin = async (values: {email: string; password: string}) => {
//     const storedUsers = await AsyncStorage.getItem('users');
//     const users = storedUsers ? JSON.parse(storedUsers) : [];

//     const user = users.find(
//       (user: {email: string; password: string}) => user.email === values.email,
//     );

//     if (user && user.password === values.password) {
//       await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
//       navigation.navigate('LoggedIn');
//     } else {
//       Alert.alert('Error', 'Invalid email or password');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Sign In</Text>
//       <Formik
//         initialValues={{email: '', password: ''}}
//         validationSchema={validationSchema}
//         onSubmit={handleLogin}>
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//         }) => (
//           <>
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: '100%',
//                 backgroundColor: 'green',
//                 height: 'max-content',
//                 padding: 10,
//                 borderRadius: 12,
//                 shadowColor: '#3498DB',
//                 shadowOffset: {width: 0, height: 3},
//                 shadowOpacity: 0.1,
//                 shadowRadius: 8,
//                 elevation: 4,
//               }}>
//               {/* Email Label */}
//               <Text style={styles.inputHeader}>Email</Text>
//               <TextInput
//                 style={[
//                   styles.input,
//                   touched.email && errors.email ? styles.inputFocus : null,
//                 ]}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#A9B0B7"
//                 value={values.email}
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//               />
//               {touched.email && errors.email && (
//                 <Text style={styles.errorText}>{errors.email}</Text>
//               )}

//               {/* Password Label */}
//               <Text style={styles.inputHeader}>Password</Text>
//               <TextInput
//                 style={[
//                   styles.input,
//                   touched.password && errors.password
//                     ? styles.inputFocus
//                     : null,
//                 ]}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#A9B0B7"
//                 secureTextEntry
//                 value={values.password}
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//               />
//               {touched.password && errors.password && (
//                 <Text style={styles.errorText}>{errors.password}</Text>
//               )}

//               {/* Sign In Button */}
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => handleSubmit()}>
//                 <Text style={styles.textColor}>Sign In</Text>
//               </TouchableOpacity>

//               {/* Sign Up Link */}
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => navigation.navigate('Register')}>
//                 <Text style={styles.textColor}>Not Registered? Sign Up</Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//       </Formik>
//     </View>
//   );
// };

// // Styles for the component
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ECF0F1',
//     padding: 20,
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#2C3E50',
//     marginBottom: 40,
//   },
//   inputHeader: {
//     marginLeft:5,
//     fontSize: 16,
//     fontWeight: '600', // Slightly bold for better readability
//     color: '#34495E', // Elegant dark shade for text
//     marginBottom: 2, // Adds spacing between label and input field
//     textTransform: 'capitalize', // Ensures the first letter of each word is capitalized
//     alignSelf: 'flex-start', // Align the label to the left
//   },
//   input: {
//     height: 50,
//     width: '100%',
//     borderColor: '#BDC3C7',
//     borderWidth: 1,
//     paddingHorizontal: 15,
//     borderRadius: 12,
//     backgroundColor: '#FFFFFF',
//     fontSize: 16,
//     color: '#34495E',
//     shadowColor: '#BDC3C7',
//     shadowOffset: {width: 0, height: 3},
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   inputFocus: {
//     borderColor: '#3498DB',
//     shadowColor: '#3498DB',
//   },

//   errorText: {
//     color: '#e74c3c',
//     fontSize: 12,
//     alignSelf: 'flex-start',
//     marginBottom: 10,
//     // marginLeft: 1,
//   },
//   textColor: {
//     color: 'white',
//     fontSize: 16,
//   },
//   button: {
//     width: '100%',
//     borderRadius: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#3498DB',
//     backgroundColor: '#3498DB',
//     marginTop: 10,
//   },
// });

// export default SignInScreen;

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const SignInScreen = ({navigation}: {navigation: any}) => {

  const handleLogin = async (values: {email: string; password: string}) => {
         const storedUsers = await AsyncStorage.getItem('users');
         const users = storedUsers ? JSON.parse(storedUsers) : [];
             const user = users.find(
           (user: {email: string; password: string}) => user.email === values.email,
         );
    
         if (user && user.password === values.password) {
           await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
           navigation.navigate('LoggedIn');
         } else {
           Alert.alert('Error', 'Invalid email or password');
         }
     };
    

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/auth-icon.png')} // Ensure correct path to image
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
         {({
           handleChange,
           handleBlur,
           handleSubmit,
           values,
           errors,
         touched,
         }) => (
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="email-outline"
                  size={20}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
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
                <Icon
                  name="lock-outline"
                  size={20}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
              </View>
              {touched.password && errors.password && (
                <View style={styles.errorContainer}>
                  <Icon name="alert-circle" size={14} color="#EF4444" />
                  <Text style={styles.errorText}>{errors.password}</Text>
                </View>
              )}
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                // console.log("Button clicked");
                handleSubmit();
              }}>
              <Text style={styles.buttonText}>Sign In</Text>
              <Icon name="arrow-right" size={20} color="white" />
            </TouchableOpacity>

            {/* Alternative Options */}
            <View style={styles.alternativeOptions}>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity> */}
              
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>
                  Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.debugButton}
              onPress={async () => {
                console.log('Current users:', await AsyncStorage.getItem('users'));
                console.log('Logged in user:', await AsyncStorage.getItem('loggedInUser'));
              }}
            >
              <Text>Debug Storage</Text>
            </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>

      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  debugButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eeeeee',
  },


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
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
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
  alternativeOptions: {
    marginTop: 32,
    alignItems: 'center',
    gap: 16,
  },
});

export default SignInScreen;
