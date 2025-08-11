import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, MessageCircle, Share, Play } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';
import { useVideoStore } from '@/store/videoStore';

interface VideoCardProps {
  title: string;
  username: string;
  views: number;
  likes: number;
  comments: number;
  thumbnail: string;
  duration: string;
  onPress: () => void;
}

export default function VideoCard({
  title,
  username,
  views,
  likes,
  comments,
  thumbnail,
  duration,
  onPress
}: VideoCardProps) {
  const { colors } = useTheme();
  const { likeVideo, videos } = useVideoStore();
  
  // Find the current video to get its like status
  const currentVideo = videos.find(v => v.username === username && v.title === title);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 16,
      marginHorizontal: Spacing.md,
      marginBottom: Spacing.md,
      elevation: 3,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    thumbnailContainer: {
      position: 'relative',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      overflow: 'hidden',
    },
    thumbnail: {
      width: '100%',
      height: 200,
      backgroundColor: colors.surface,
    },
    playButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -25 }, { translateY: -25 }],
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(16, 185, 129, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    duration: {
      position: 'absolute',
      bottom: Spacing.sm,
      right: Spacing.sm,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: 4,
    },
    durationText: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.medium,
    },
    content: {
      padding: Spacing.md,
    },
    title: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
      marginBottom: Spacing.xs,
      lineHeight: 24,
    },
    username: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.medium,
      color: colors.primary,
      marginBottom: Spacing.sm,
    },
    stats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Spacing.sm,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    statText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    views: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
    },
  });

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleLike = (e: any) => {
    e.stopPropagation(); // Prevent video navigation
    if (currentVideo) {
      likeVideo(currentVideo.id);
    }
  };

  const handleShare = (e: any) => {
    e.stopPropagation();
    // Implement share functionality
    console.log('Sharing video');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        <View style={styles.playButton}>
          <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
        </View>
        <View style={styles.duration}>
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.username}>@{username}</Text>
        
        <View style={styles.stats}>
          <Text style={styles.views}>{formatNumber(views)} views</Text>
          
          <View style={{ flexDirection: 'row', gap: Spacing.md }}>
            <TouchableOpacity style={styles.statItem} onPress={handleLike}>
              <Heart 
                size={16} 
                color={currentVideo?.isLiked ? colors.error : colors.textSecondary}
                fill={currentVideo?.isLiked ? colors.error : 'none'}
              />
              <Text style={styles.statText}>{formatNumber(likes)}</Text>
            </TouchableOpacity>
            
            <View style={styles.statItem}>
              <MessageCircle size={16} color={colors.textSecondary} />
              <Text style={styles.statText}>{formatNumber(comments)}</Text>
            </View>
            
            <TouchableOpacity onPress={handleShare}>
              <Share size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}