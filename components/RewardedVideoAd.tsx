import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { useTheme } from '@/hooks/useTheme';
import { ADMOB_CONFIG } from './AdMobConfig';
import { Spacing, Typography } from '@/constants/Colors';

interface RewardedVideoAdProps {
  isVisible: boolean;
  onAdClosed: () => void;
  onAdRewarded?: () => void;
}

const rewardedAd = RewardedAd.createForAdRequest(ADMOB_CONFIG.REWARDED_VIDEO_ID, {
  requestNonPersonalizedAdsOnly: true,
});

export default function RewardedVideoAd({ isVisible, onAdClosed, onAdRewarded }: RewardedVideoAdProps) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainer: {
      backgroundColor: colors.card,
      padding: Spacing.xl,
      borderRadius: 16,
      alignItems: 'center',
      marginHorizontal: Spacing.xl,
    },
    loadingText: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.medium,
      color: colors.text,
      marginTop: Spacing.md,
      textAlign: 'center',
    },
    errorText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.error,
      textAlign: 'center',
      marginTop: Spacing.sm,
    },
  });

  useEffect(() => {
    // Load ad when component mounts
    loadAd();

    // Set up event listeners
    const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('Rewarded ad loaded');
      setIsAdLoaded(true);
      setIsLoading(false);
      setError(null);
    });

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log('User earned reward:', reward);
        onAdRewarded?.();
      }
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(RewardedAdEventType.CLOSED, () => {
      console.log('Rewarded ad closed');
      onAdClosed();
      // Load next ad
      loadAd();
    });

    const unsubscribeError = rewardedAd.addAdEventListener(RewardedAdEventType.ERROR, (error) => {
      console.error('Rewarded ad error:', error);
      setError('Failed to load ad. Please try again.');
      setIsLoading(false);
      // Close modal after error
      setTimeout(() => {
        onAdClosed();
      }, 2000);
    });

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  useEffect(() => {
    if (isVisible && isAdLoaded) {
      showAd();
    } else if (isVisible && !isAdLoaded && !isLoading) {
      loadAd();
    }
  }, [isVisible, isAdLoaded]);

  const loadAd = () => {
    if (!isLoading) {
      setIsLoading(true);
      setError(null);
      rewardedAd.load();
    }
  };

  const showAd = () => {
    if (isAdLoaded) {
      rewardedAd.show();
      setIsAdLoaded(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modal}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>
            {isLoading ? 'Loading ad...' : 'Preparing video...'}
          </Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    </Modal>
  );
}