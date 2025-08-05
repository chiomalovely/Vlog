import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Search, TrendingUp, Hash, Users, Music } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';
import VideoCard from '@/components/VideoCard';

export default function ExploreScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.lg,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: Typography.fontSize['2xl'],
      fontFamily: Typography.fontFamily.bold,
      color: colors.text,
      marginBottom: Spacing.md,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      marginBottom: Spacing.md,
    },
    searchInput: {
      flex: 1,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.text,
      marginLeft: Spacing.sm,
    },
    section: {
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
      marginBottom: Spacing.sm,
      paddingHorizontal: Spacing.md,
    },
    trendingContainer: {
      paddingHorizontal: Spacing.md,
    },
    trendingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: Spacing.md,
      borderRadius: 12,
      marginBottom: Spacing.sm,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    trendingIcon: {
      marginRight: Spacing.sm,
    },
    trendingText: {
      flex: 1,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.medium,
      color: colors.text,
    },
    trendingCount: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    categoriesContainer: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.md,
      gap: Spacing.sm,
    },
    categoryItem: {
      backgroundColor: colors.card,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.medium,
      color: colors.text,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      paddingBottom: Spacing.xxl,
    },
  });

  const trendingTopics = [
    { id: '1', text: '#TravelTips', count: '2.3M', icon: Hash },
    { id: '2', text: 'Cooking Hacks', count: '1.8M', icon: TrendingUp },
    { id: '3', text: '#FitnessChallenge', count: '956K', icon: Hash },
    { id: '4', text: 'Music Covers', count: '743K', icon: Music },
    { id: '5', text: 'Top Creators', count: '512K', icon: Users },
  ];

  const categories = ['Music', 'Comedy', 'Travel', 'Food', 'Fitness', 'Tech', 'Art', 'Gaming'];

  const trendingVideos = [
    {
      id: '1',
      title: 'Viral Dance Challenge - Everyone\'s Doing It!',
      username: 'dancepro',
      views: 892000,
      likes: 45600,
      comments: 1234,
      thumbnail: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '1:23',
    },
    {
      id: '2',
      title: '10 Life Hacks That Will Change Your Day',
      username: 'lifehacker',
      views: 567000,
      likes: 32100,
      comments: 876,
      thumbnail: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3:56',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos, users, hashtags..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <View style={styles.trendingContainer}>
            {trendingTopics.map((topic) => {
              const IconComponent = topic.icon;
              return (
                <TouchableOpacity key={topic.id} style={styles.trendingItem}>
                  <View style={styles.trendingIcon}>
                    <IconComponent size={20} color={colors.primary} />
                  </View>
                  <Text style={styles.trendingText}>{topic.text}</Text>
                  <Text style={styles.trendingCount}>{topic.count}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity key={category} style={styles.categoryItem}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Videos</Text>
          {trendingVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              username={video.username}
              views={video.views}
              likes={video.likes}
              comments={video.comments}
              thumbnail={video.thumbnail}
              duration={video.duration}
              onPress={() => console.log('Opening video:', video.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}