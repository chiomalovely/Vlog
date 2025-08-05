import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Bell, Zap } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';
import VideoCard from '@/components/VideoCard';

export default function HomeScreen() {
  const { colors } = useTheme();
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

  // Mock data - replace with real data from your backend
  const videos = [
    {
      id: '1',
      title: 'Amazing Travel Adventure in Bali - You Won\'t Believe What Happened!',
      username: 'traveljunkie',
      views: 125000,
      likes: 8500,
      comments: 342,
      thumbnail: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3:45',
    },
    {
      id: '2',
      title: 'Cooking the Perfect Pasta - Chef\'s Secret Recipe',
      username: 'kitchenmaster',
      views: 89000,
      likes: 6200,
      comments: 189,
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '2:18',
    },
    {
      id: '3',
      title: 'Mind-Blowing Magic Tricks That Will Amaze You',
      username: 'magicwizard',
      views: 234000,
      likes: 15600,
      comments: 891,
      thumbnail: 'https://images.pexels.com/photos/6941/music-bokeh-lights-party.jpg?auto=compress&cs=tinysrgb&w=800',
      duration: '4:02',
    },
    {
      id: '4',
      title: 'Epic Workout Routine - Get Fit in 30 Days',
      username: 'fitnessqueen',
      views: 67000,
      likes: 4300,
      comments: 156,
      thumbnail: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '8:15',
    },
  ];

  const handleVideoPress = (videoId: string) => {
    // Navigate to video watch screen
    console.log('Opening video:', videoId);
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
      </ScrollView>
    </SafeAreaView>
  );
}