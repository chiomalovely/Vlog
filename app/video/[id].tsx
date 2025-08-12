import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, MessageCircle, Share, Bookmark } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useVideoStore } from '@/store/videoStore';
import { Spacing, Typography } from '@/constants/Colors';
import VideoPlayer from '@/components/VideoPlayer';
import RewardedVideoAd from '@/components/RewardedVideoAd';

export default function VideoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { videos, likeVideo, bookmarkVideo } = useVideoStore();
  const [showRewardedAd, setShowRewardedAd] = useState(true);

  const video = videos.find(v => v.id === id);

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
    content: {
      flex: 1,
    },
    videoContainer: {
      padding: Spacing.md,
    },
    videoInfo: {
      marginTop: Spacing.md,
    },
    title: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
      marginBottom: Spacing.sm,
      lineHeight: 24,
    },
    username: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.medium,
      color: colors.primary,
      marginBottom: Spacing.sm,
    },
    description: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.text,
      lineHeight: 22,
      marginBottom: Spacing.md,
    },
    hashtags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: Spacing.md,
    },
    hashtag: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.medium,
      color: colors.primary,
      marginRight: Spacing.sm,
      marginBottom: Spacing.xs,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: Spacing.md,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    actionButton: {
      alignItems: 'center',
      padding: Spacing.sm,
    },
    actionText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.medium,
      color: colors.text,
      marginTop: 4,
    },
    likedText: {
      color: colors.error,
    },
    bookmarkedText: {
      color: colors.primary,
    },
    stats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: Spacing.md,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.bold,
      color: colors.text,
    },
    statLabel: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      marginTop: 2,
    },
  });

  if (!video) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Video Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleLike = () => {
    likeVideo(video.id);
  };

  const handleBookmark = () => {
    bookmarkVideo(video.id);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing video:', video.id);
  };

  const handleAdClosed = () => {
    setShowRewardedAd(false);
  };

  const handleAdRewarded = () => {
    console.log('User watched rewarded ad');
    // You can add rewards logic here if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <RewardedVideoAd
        isVisible={showRewardedAd}
        onAdClosed={handleAdClosed}
        onAdRewarded={handleAdRewarded}
      />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.videoContainer}>
          <VideoPlayer 
            videoUrl={video.videoUrl} 
            autoPlay={!showRewardedAd} 
            showControls={!showRewardedAd}
          />
          
          <View style={styles.videoInfo}>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.username}>@{video.username}</Text>
            
            {video.description && (
              <Text style={styles.description}>{video.description}</Text>
            )}
            
            {video.hashtags && video.hashtags.length > 0 && (
              <View style={styles.hashtags}>
                {video.hashtags.map((hashtag, index) => (
                  <Text key={index} style={styles.hashtag}>{hashtag}</Text>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{formatNumber(video.views)}</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{formatNumber(video.likes)}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{formatNumber(video.comments)}</Text>
            <Text style={styles.statLabel}>Comments</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Heart 
              size={24} 
              color={video.isLiked ? colors.error : colors.text}
              fill={video.isLiked ? colors.error : 'none'}
            />
            <Text style={[styles.actionText, video.isLiked && styles.likedText]}>
              Like
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color={colors.text} />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share size={24} color={colors.text} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
            <Bookmark 
              size={24} 
              color={video.isBookmarked ? colors.primary : colors.text}
              fill={video.isBookmarked ? colors.primary : 'none'}
            />
            <Text style={[styles.actionText, video.isBookmarked && styles.bookmarkedText]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}