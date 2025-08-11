import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';

// Note: This is a placeholder component for AdMob integration
// In a real app, you would use react-native-google-mobile-ads
// For now, we'll show a placeholder ad banner

interface AdBannerProps {
  size?: 'banner' | 'largeBanner' | 'mediumRectangle';
  style?: any;
}

export default function AdBanner({ size = 'banner', style }: AdBannerProps) {
  const { colors } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: Spacing.sm,
    },
    banner: {
      width: 320,
      height: 50,
    },
    largeBanner: {
      width: 320,
      height: 100,
    },
    mediumRectangle: {
      width: 300,
      height: 250,
    },
    adText: {
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    adLabel: {
      position: 'absolute',
      top: 2,
      left: 4,
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      opacity: 0.7,
    },
  });

  const getAdSize = () => {
    switch (size) {
      case 'largeBanner':
        return styles.largeBanner;
      case 'mediumRectangle':
        return styles.mediumRectangle;
      default:
        return styles.banner;
    }
  };

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, getAdSize(), style]}>
      <Text style={styles.adLabel}>Ad</Text>
      {isLoaded ? (
        <Text style={styles.adText}>
          {size === 'mediumRectangle' 
            ? 'Advertisement\n\nYour ad could be here!\nReach millions of users\nwith VlogSnap Ads'
            : 'Advertisement - Your ad could be here!'
          }
        </Text>
      ) : (
        <Text style={styles.adText}>Loading ad...</Text>
      )}
    </View>
  );
}

// TODO: Replace with actual AdMob implementation
/*
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyy';

export default function AdBanner({ size = 'banner', style }: AdBannerProps) {
  const getBannerSize = () => {
    switch (size) {
      case 'largeBanner':
        return BannerAdSize.LARGE_BANNER;
      case 'mediumRectangle':
        return BannerAdSize.MEDIUM_RECTANGLE;
      default:
        return BannerAdSize.BANNER;
    }
  };

  return (
    <BannerAd
      unitId={adUnitId}
      size={getBannerSize()}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => {
        console.log('Ad loaded');
      }}
      onAdFailedToLoad={(error) => {
        console.log('Ad failed to load:', error);
      }}
    />
  );
}
*/