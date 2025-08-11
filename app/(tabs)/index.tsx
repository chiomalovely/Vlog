import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Bell, Zap } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';
import { useVideoStore } from '@/store/videoStore';
import { useRouter } from 'expo-router';
import VideoCard from '@/components/VideoCard';
import AdBanner from '@/components/AdBanner';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { videos, isLoading } = useVideoStore();
  const [activeTab, setActiveTab] = useState<'following' | 'for-you'>('for-you');

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
    logo: {
      fontSize: Typography.fontSize['3xl'],
      fontFamily: Typography.fontFamily.bold,
      color: colors.primary,
    },
    notificationButton: {
      padding: Spacing.sm,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      marginHorizontal: Spacing.md,
      marginVertical: Spacing.sm,
      borderRadius: 12,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: 8,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.medium,
      color: colors.textSecondary,
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.xxl,
    },
  });


  const handleVideoPress = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>VlogSnap</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'following' && styles.activeTab]}
          onPress={() => setActiveTab('following')}
        >
          <Text style={[styles.tabText, activeTab === 'following' && styles.activeTabText]}>
            Following
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'for-you' && styles.activeTab]}
          onPress={() => setActiveTab('for-you')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Zap size={16} color={activeTab === 'for-you' ? '#FFFFFF' : colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'for-you' && styles.activeTabText]}>
              For You
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <AdBanner size="banner" />
        
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            username={video.username}
            views={video.views}
            likes={video.likes}
            comments={video.comments}
            thumbnail={video.thumbnail}
            duration={video.duration}
            onPress={() => handleVideoPress(video.id)}
          />
        ))}
        
        <AdBanner size="mediumRectangle" />
      </ScrollView>
    </SafeAreaView>
  );
}