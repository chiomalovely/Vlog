import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Search, MessageCircle, Users, Plus, CreditCard as Edit } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';
import { useRouter } from 'expo-router';

interface ChatItem {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export default function ChatScreen() {
  const { colors } = useTheme();
  const router = useRouter();
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
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    title: {
      fontSize: Typography.fontSize['2xl'],
      fontFamily: Typography.fontFamily.bold,
      color: colors.text,
    },
    newChatButton: {
      padding: Spacing.sm,
      borderRadius: 12,
      backgroundColor: colors.primary,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    searchInput: {
      flex: 1,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.text,
      marginLeft: Spacing.sm,
    },
    chatList: {
      flex: 1,
    },
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatarContainer: {
      position: 'relative',
      marginRight: Spacing.md,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.surface,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.success,
      borderWidth: 2,
      borderColor: colors.background,
    },
    chatInfo: {
      flex: 1,
    },
    chatHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    username: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
    },
    timestamp: {
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    lastMessage: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    unreadCount: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: Spacing.sm,
    },
    unreadText: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.bold,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Spacing.xl,
    },
    emptyIcon: {
      marginBottom: Spacing.md,
    },
    emptyTitle: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    emptyDescription: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
  });

  // Mock chat data
  const chats: ChatItem[] = [
    {
      id: '1',
      username: 'traveljunkie',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Hey! Loved your latest travel video 🌍',
      timestamp: '2m',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      username: 'kitchenmaster',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Thanks for the cooking tips! Can\'t wait to try the recipe.',
      timestamp: '1h',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      username: 'fitnessqueen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Your workout routine is amazing! 💪',
      timestamp: '3h',
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: '4',
      username: 'magicwizard',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'How did you do that trick? Mind blown! 🎩✨',
      timestamp: '1d',
      unreadCount: 0,
      isOnline: false,
    },
  ];

  const filteredChats = chats.filter(chat =>
    chat.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatPress = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const handleNewChat = () => {
    console.log('Opening new chat dialog');
    // Navigation to user search or new chat would go here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
            <Edit size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {filteredChats.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <MessageCircle size={64} color={colors.textSecondary} />
          </View>
          <Text style={styles.emptyTitle}>No conversations yet</Text>
          <Text style={styles.emptyDescription}>
            Start chatting with other creators and discover amazing content together!
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.chatList}>
          {filteredChats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => handleChatPress(chat.id)}
              activeOpacity={0.7}
            >
              <View style={styles.avatarContainer}>
                <Image source={{ uri: chat.avatar }} style={styles.avatar} />
                {chat.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <Text style={styles.username}>@{chat.username}</Text>
                  <Text style={styles.timestamp}>{chat.timestamp}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
              </View>
              
              {chat.unreadCount > 0 && (
                <View style={styles.unreadCount}>
                  <Text style={styles.unreadText}>
                    {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}