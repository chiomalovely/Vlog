import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Settings, CreditCard as Edit, Users, Heart, Play, Bookmark, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'videos' | 'saved' | 'earnings'>('videos');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.lg,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
    },
    settingsButton: {
      padding: Spacing.sm,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
    profileInfo: {
      alignItems: 'center',
      paddingVertical: Spacing.xl,
      paddingHorizontal: Spacing.md,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.surface,
      marginBottom: Spacing.md,
    },
    username: {
      fontSize: Typography.fontSize['2xl'],
      fontFamily: Typography.fontFamily.bold,
      color: colors.text,
      marginBottom: 4,
    },
    fullName: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      marginBottom: Spacing.sm,
    },
    bio: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.text,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: Spacing.md,
    },
    joinDate: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      marginBottom: Spacing.md,
    },
    stats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: Spacing.md,
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
    editButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    editButtonText: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.medium,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      marginHorizontal: Spacing.md,
      borderRadius: 12,
      padding: 4,
      marginBottom: Spacing.md,
    },
    tab: {
      flex: 1,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 4,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.medium,
      color: colors.textSecondary,
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.md,
    },
    videoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    videoItem: {
      width: '48%',
      aspectRatio: 9/16,
      borderRadius: 12,
      backgroundColor: colors.surface,
      position: 'relative',
      overflow: 'hidden',
    },
    videoThumbnail: {
      width: '100%',
      height: '100%',
    },
    videoOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: Spacing.sm,
    },
    videoTitle: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.medium,
      numberOfLines: 2,
    },
    videoViews: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      marginTop: 2,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacing.xxl,
    },
    emptyIcon: {
      marginBottom: Spacing.md,
    },
    emptyTitle: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
      marginBottom: Spacing.sm,
    },
    emptyDescription: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    earningsCard: {
      backgroundColor: colors.card,
      padding: Spacing.md,
      borderRadius: 12,
      marginBottom: Spacing.md,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    earningsTitle: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
      marginBottom: Spacing.sm,
    },
    earningsAmount: {
      fontSize: Typography.fontSize['3xl'],
      fontFamily: Typography.fontFamily.bold,
      color: colors.primary,
      marginBottom: Spacing.sm,
    },
    earningsDescription: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
    },
  });

  const userProfile = {
    username: 'creativemind',
    fullName: 'Alex Johnson',
    bio: 'Content creator sharing travel, food, and lifestyle moments ✨\nLiving life one adventure at a time 🌍',
    joinDate: 'Joined March 2024',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    followers: 45600,
    following: 1234,
    videos: 89,
    likes: 892000,
  };

  const userVideos = [
    {
      id: '1',
      title: 'Amazing Sunset at the Beach',
      views: 15600,
      thumbnail: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      title: 'Best Coffee Shop in Town',
      views: 8900,
      thumbnail: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '3',
      title: 'Mountain Hiking Adventure',
      views: 23400,
      thumbnail: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '4',
      title: 'Cooking My Favorite Recipe',
      views: 12300,
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'videos':
        return (
          <View style={styles.videoGrid}>
            {userVideos.map((video) => (
              <TouchableOpacity key={video.id} style={styles.videoItem}>
                <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
                <View style={styles.videoOverlay}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoViews}>{formatNumber(video.views)} views</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      case 'saved':
        return (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Bookmark size={48} color={colors.textSecondary} />
            </View>
            <Text style={styles.emptyTitle}>No saved videos</Text>
            <Text style={styles.emptyDescription}>
              Videos you bookmark will appear here
            </Text>
          </View>
        );
      
      case 'earnings':
        return (
          <View>
            <View style={styles.earningsCard}>
              <Text style={styles.earningsTitle}>Total Earnings</Text>
              <Text style={styles.earningsAmount}>$2,456.78</Text>
              <Text style={styles.earningsDescription}>
                Earned from ad revenue and creator monetization
              </Text>
            </View>
            
            <View style={styles.earningsCard}>
              <Text style={styles.earningsTitle}>This Month</Text>
              <Text style={styles.earningsAmount}>$432.15</Text>
              <Text style={styles.earningsDescription}>
                +15% compared to last month
              </Text>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>@{userProfile.username}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <Text style={styles.username}>@{userProfile.username}</Text>
          <Text style={styles.fullName}>{userProfile.fullName}</Text>
          <Text style={styles.bio}>{userProfile.bio}</Text>
          <Text style={styles.joinDate}>{userProfile.joinDate}</Text>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatNumber(userProfile.followers)}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatNumber(userProfile.following)}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.videos}</Text>
              <Text style={styles.statLabel}>Videos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatNumber(userProfile.likes)}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Edit size={16} color="#FFFFFF" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
            onPress={() => setActiveTab('videos')}
          >
            <Play size={16} color={activeTab === 'videos' ? '#FFFFFF' : colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>
              Videos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Bookmark size={16} color={activeTab === 'saved' ? '#FFFFFF' : colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
              Saved
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'earnings' && styles.activeTab]}
            onPress={() => setActiveTab('earnings')}
          >
            <TrendingUp size={16} color={activeTab === 'earnings' ? '#FFFFFF' : colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'earnings' && styles.activeTabText]}>
              Earnings
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}