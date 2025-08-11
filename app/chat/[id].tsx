import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Send, Smile, Paperclip } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/store/authStore';
import { Spacing, Typography } from '@/constants/Colors';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  isMe: boolean;
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuthStore();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  // Mock chat data
  const chatUser = {
    id: id,
    username: 'traveljunkie',
    name: 'Sarah Wilson',
    isOnline: true,
  };

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
      backgroundColor: colors.background,
    },
    backButton: {
      padding: Spacing.sm,
      marginRight: Spacing.sm,
    },
    headerInfo: {
      flex: 1,
    },
    headerName: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
    },
    headerStatus: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.primary,
      marginTop: 2,
    },
    messagesContainer: {
      flex: 1,
      paddingHorizontal: Spacing.md,
    },
    messageItem: {
      marginVertical: Spacing.xs,
      maxWidth: '80%',
    },
    myMessage: {
      alignSelf: 'flex-end',
    },
    otherMessage: {
      alignSelf: 'flex-start',
    },
    messageBubble: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: 18,
    },
    myMessageBubble: {
      backgroundColor: colors.primary,
    },
    otherMessageBubble: {
      backgroundColor: colors.surface,
    },
    messageText: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      lineHeight: 20,
    },
    myMessageText: {
      color: '#FFFFFF',
    },
    otherMessageText: {
      color: colors.text,
    },
    messageTime: {
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      marginTop: 4,
      alignSelf: 'flex-end',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    textInput: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 20,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.text,
      maxHeight: 100,
    },
    inputActions: {
      flexDirection: 'row',
      marginLeft: Spacing.sm,
    },
    actionButton: {
      padding: Spacing.sm,
      marginLeft: Spacing.xs,
    },
    sendButton: {
      backgroundColor: colors.primary,
      borderRadius: 20,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Spacing.xl,
    },
    emptyText: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  // Initialize with some mock messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        text: 'Hey! Loved your latest travel video 🌍',
        senderId: chatUser.id!,
        senderName: chatUser.name,
        timestamp: new Date(Date.now() - 3600000),
        isMe: false,
      },
      {
        id: '2',
        text: 'Thank you so much! It was an amazing trip',
        senderId: user?.id || 'me',
        senderName: user?.fullName || 'You',
        timestamp: new Date(Date.now() - 3500000),
        isMe: true,
      },
      {
        id: '3',
        text: 'Where was that beautiful sunset shot?',
        senderId: chatUser.id!,
        senderName: chatUser.name,
        timestamp: new Date(Date.now() - 3400000),
        isMe: false,
      },
    ];
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        senderId: user?.id || 'me',
        senderName: user?.fullName || 'You',
        timestamp: new Date(),
        isMe: true,
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Simulate response after 2 seconds
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for your message! 😊',
          senderId: chatUser.id!,
          senderName: chatUser.name,
          timestamp: new Date(),
          isMe: false,
        };
        setMessages(prev => [...prev, responseMessage]);
        
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>@{chatUser.username}</Text>
          <Text style={styles.headerStatus}>
            {chatUser.isOnline ? 'Online' : 'Last seen recently'}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={{ paddingVertical: Spacing.md }}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Start a conversation with @{chatUser.username}
              </Text>
            </View>
          ) : (
            messages.map((msg) => (
              <View 
                key={msg.id} 
                style={[
                  styles.messageItem, 
                  msg.isMe ? styles.myMessage : styles.otherMessage
                ]}
              >
                <View 
                  style={[
                    styles.messageBubble,
                    msg.isMe ? styles.myMessageBubble : styles.otherMessageBubble
                  ]}
                >
                  <Text 
                    style={[
                      styles.messageText,
                      msg.isMe ? styles.myMessageText : styles.otherMessageText
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
                <Text style={styles.messageTime}>
                  {formatTime(msg.timestamp)}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={1000}
          />
          
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Smile size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Paperclip size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.sendButton]} 
              onPress={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}