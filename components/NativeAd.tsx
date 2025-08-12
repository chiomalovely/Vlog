import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeAd, NativeAdView, HeadlineView, TaglineView, AdvertiserView, CallToActionView, IconView } from 'react-native-google-mobile-ads';
import { useTheme } from '@/hooks/useTheme';
import { ADMOB_CONFIG } from './AdMobConfig';
import { Spacing, Typography } from '@/constants/Colors';

interface NativeAdProps {
  style?: any;
}

export default function NativeAdComponent({ style }: NativeAdProps) {
  const { colors } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginHorizontal: Spacing.md,
      marginVertical: Spacing.sm,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    adLabel: {
      position: 'absolute',
      top: 4,
      left: 8,
      backgroundColor: colors.primary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      zIndex: 1,
    },
    adLabelText: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.bold,
    },
    adContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: Spacing.sm,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 8,
      overflow: 'hidden',
      marginRight: Spacing.md,
      backgroundColor: colors.surface,
    },
    textContent: {
      flex: 1,
    },
    headline: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
      marginBottom: 4,
    },
    tagline: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      marginBottom: 4,
      lineHeight: 18,
    },
    advertiser: {
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      marginBottom: Spacing.sm,
    },
    ctaButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    ctaText: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.semiBold,
    },
    loadingContainer: {
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
    },
  });

  useEffect(() => {
    loadNativeAd();
  }, []);

  const loadNativeAd = () => {
    const ad = NativeAd.createForAdRequest(ADMOB_CONFIG.NATIVE_AD_ID, {
      requestNonPersonalizedAdsOnly: true,
    });

    ad.load();

    const unsubscribeLoaded = ad.addAdEventListener('loaded', () => {
      console.log('Native ad loaded');
      setNativeAd(ad);
      setIsLoaded(true);
    });

    const unsubscribeError = ad.addAdEventListener('error', (error) => {
      console.error('Native ad error:', error);
    });

    return () => {
      unsubscribeLoaded();
      unsubscribeError();
    };
  };

  if (!isLoaded || !nativeAd) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading ad...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.adLabel}>
        <Text style={styles.adLabelText}>Ad</Text>
      </View>
      
      <NativeAdView nativeAd={nativeAd}>
        <View style={styles.adContent}>
          <IconView style={styles.iconContainer} />
          
          <View style={styles.textContent}>
            <HeadlineView style={styles.headline} />
            <TaglineView style={styles.tagline} />
            <AdvertiserView style={styles.advertiser} />
            
            <CallToActionView style={styles.ctaButton}>
              <Text style={styles.ctaText}>Learn More</Text>
            </CallToActionView>
          </View>
        </View>
      </NativeAdView>
    </View>
  );
}