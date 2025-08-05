import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Play, Zap, Users, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';

export default function WelcomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    hero: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.xxl,
    },
    logo: {
      fontSize: Typography.fontSize['4xl'],
      fontFamily: Typography.fontFamily.bold,
      color: colors.primary,
      textAlign: 'center',
      marginBottom: Spacing.md,
    },
    tagline: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.medium,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: Spacing.xxl,
    },
    featuresContainer: {
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.xxl,
    },
    feature: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.lg,
      paddingHorizontal: Spacing.md,
    },
    featureIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
      marginBottom: 2,
    },
    featureDescription: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    buttonsContainer: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.xxl,
    },
    primaryButton: {
      backgroundColor: colors.primary,
      paddingVertical: Spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
    },
    secondaryButton: {
      backgroundColor: colors.surface,
      paddingVertical: Spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondaryButtonText: {
      color: colors.text,
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.medium,
    },
    skipButton: {
      alignItems: 'center',
      marginTop: Spacing.md,
    },
    skipButtonText: {
      color: colors.textSecondary,
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
    },
  });

  const features = [
    {
      icon: Play,
      title: 'Create & Share',
      description: 'Share short videos up to 4 minutes or long-form content up to 10 hours',
    },
    {
      icon: Zap,
      title: 'Go Viral',
      description: 'Our smart algorithm helps your content reach the right audience quickly',
    },
    {
      icon: Users,
      title: 'Connect',
      description: 'Chat with creators worldwide and build your community',
    },
    {
      icon: Star,
      title: 'Earn Money',
      description: 'Monetize your content with our creator monetization program',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>VlogSnap</Text>
        <Text style={styles.tagline}>Create. Share. Go Viral.</Text>
      </View>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <View key={index} style={styles.feature}>
              <View style={styles.featureIcon}>
                <IconComponent size={24} color={colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.secondaryButtonText}>I have an account</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}