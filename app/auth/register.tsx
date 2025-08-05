import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, AtSign, Phone } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';

export default function RegisterScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: Spacing.sm,
      marginRight: Spacing.sm,
    },
    headerTitle: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      padding: Spacing.md,
      paddingBottom: Spacing.xxl,
    },
    logo: {
      fontSize: Typography.fontSize['3xl'],
      fontFamily: Typography.fontFamily.bold,
      color: colors.primary,
      textAlign: 'center',
      marginBottom: Spacing.lg,
    },
    title: {
      fontSize: Typography.fontSize['2xl'],
      fontFamily: Typography.fontFamily.bold,
      color: colors.text,
      textAlign: 'center',
      marginBottom: Spacing.sm,
    },
    subtitle: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: Spacing.xl,
    },
    inputContainer: {
      position: 'relative',
      marginBottom: Spacing.md,
    },
    inputIcon: {
      position: 'absolute',
      left: Spacing.md,
      top: Spacing.md,
      zIndex: 1,
    },
    input: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingVertical: Spacing.md,
      paddingLeft: Spacing.xl + Spacing.md,
      paddingRight: Spacing.md,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    passwordContainer: {
      position: 'relative',
    },
    passwordToggle: {
      position: 'absolute',
      right: Spacing.md,
      top: Spacing.md,
      zIndex: 1,
    },
    usernameHint: {
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      marginTop: 4,
      marginBottom: Spacing.sm,
    },
    registerButton: {
      backgroundColor: colors.primary,
      paddingVertical: Spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    registerButtonText: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
    },
    disabledButton: {
      backgroundColor: colors.textSecondary,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: Spacing.lg,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      marginHorizontal: Spacing.md,
    },
    googleButton: {
      backgroundColor: colors.card,
      paddingVertical: Spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: Spacing.lg,
    },
    googleButtonText: {
      color: colors.text,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.medium,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Spacing.md,
    },
    loginText: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    loginLink: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.primary,
      marginLeft: 4,
    },
    errorText: {
      color: colors.error,
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      marginTop: 4,
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { fullName, username, email, password, confirmPassword } = formData;
    
    if (!fullName.trim()) return 'Full name is required';
    if (!username.trim()) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (!email.trim()) return 'Email is required';
    if (!email.includes('@')) return 'Please enter a valid email';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    
    return null;
  };

  const handleRegister = async () => {
    const validationError = validateForm();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Success!', 
        'Your account has been created successfully!',
        [
          { text: 'OK', onPress: () => router.replace('/(tabs)') }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    Alert.alert('Google Registration', 'Google authentication coming soon!');
  };

  const isFormValid = Object.values(formData).every(value => value.trim().length > 0) && 
                     formData.password === formData.confirmPassword;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.logo}>VlogSnap</Text>
          
          <Text style={styles.title}>Join VlogSnap</Text>
          <Text style={styles.subtitle}>Create your account and start sharing</Text>

          <View style={styles.inputContainer}>
            <User size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor={colors.textSecondary}
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              autoCapitalize="words"
              autoComplete="name"
            />
          </View>

          <View style={styles.inputContainer}>
            <AtSign size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={colors.textSecondary}
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              autoCapitalize="none"
              autoComplete="username"
            />
            <Text style={styles.usernameHint}>
              This will be your public username (@{formData.username})
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={colors.textSecondary}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Phone size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone number (optional)"
              placeholderTextColor={colors.textSecondary}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <Lock size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.textSecondary} />
                ) : (
                  <Eye size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <Lock size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor={colors.textSecondary}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color={colors.textSecondary} />
                ) : (
                  <Eye size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.registerButton, !isFormValid && styles.disabledButton]}
            onPress={handleRegister}
            disabled={!isFormValid || isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleRegister}>
            <Text style={styles.googleButtonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}