import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Camera, Image, Video, Upload, Hash, Type } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';

export default function UploadScreen() {
  const { colors } = useTheme();
  const [videoType, setVideoType] = useState<'short' | 'long'>('short');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');

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
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    content: {
      padding: Spacing.md,
    },
    section: {
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
      color: colors.text,
      marginBottom: Spacing.sm,
    },
    typeContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 4,
      marginBottom: Spacing.lg,
    },
    typeButton: {
      flex: 1,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: 8,
      alignItems: 'center',
    },
    activeType: {
      backgroundColor: colors.primary,
    },
    typeText: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.medium,
      color: colors.textSecondary,
      marginTop: 4,
    },
    activeTypeText: {
      color: '#FFFFFF',
    },
    typeDescription: {
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
      marginTop: 2,
    },
    activeTypeDescription: {
      color: 'rgba(255, 255, 255, 0.8)',
    },
    uploadOptions: {
      flexDirection: 'row',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    uploadButton: {
      flex: 1,
      backgroundColor: colors.card,
      padding: Spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: 'dashed',
    },
    uploadButtonText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.medium,
      color: colors.text,
      marginTop: Spacing.sm,
      textAlign: 'center',
    },
    input: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: Spacing.md,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: Spacing.md,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    inputIcon: {
      position: 'absolute',
      left: Spacing.md,
      top: Spacing.md,
    },
    inputWithIcon: {
      paddingLeft: Spacing.xl + Spacing.md,
    },
    publishButton: {
      backgroundColor: colors.primary,
      paddingVertical: Spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: Spacing.lg,
    },
    publishButtonText: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.semiBold,
    },
    disabledButton: {
      backgroundColor: colors.textSecondary,
    },
  });

  const handleRecordVideo = () => {
    Alert.alert('Camera', 'Opening camera to record video...');
  };

  const handleSelectFromGallery = () => {
    Alert.alert('Gallery', 'Opening gallery to select video...');
  };

  const handlePublish = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your video');
      return;
    }
    
    Alert.alert('Success', 'Video uploaded successfully!');
    // Reset form
    setTitle('');
    setDescription('');
    setHashtags('');
  };

  const isFormValid = title.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Video</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Video Type</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[styles.typeButton, videoType === 'short' && styles.activeType]}
                onPress={() => setVideoType('short')}
              >
                <Video size={24} color={videoType === 'short' ? '#FFFFFF' : colors.textSecondary} />
                <Text style={[styles.typeText, videoType === 'short' && styles.activeTypeText]}>
                  Short
                </Text>
                <Text style={[styles.typeDescription, videoType === 'short' && styles.activeTypeDescription]}>
                  ≤ 4 minutes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeButton, videoType === 'long' && styles.activeType]}
                onPress={() => setVideoType('long')}
              >
                <Video size={24} color={videoType === 'long' ? '#FFFFFF' : colors.textSecondary} />
                <Text style={[styles.typeText, videoType === 'long' && styles.activeTypeText]}>
                  Long
                </Text>
                <Text style={[styles.typeDescription, videoType === 'long' && styles.activeTypeDescription]}>
                  ≤ 10 hours
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Video</Text>
            <View style={styles.uploadOptions}>
              <TouchableOpacity style={styles.uploadButton} onPress={handleRecordVideo}>
                <Camera size={32} color={colors.primary} />
                <Text style={styles.uploadButtonText}>Record Video</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.uploadButton} onPress={handleSelectFromGallery}>
                <Image size={32} color={colors.primary} />
                <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Video Details</Text>
            
            <View style={{ position: 'relative', marginBottom: Spacing.md }}>
              <Type size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Enter video title..."
                placeholderTextColor={colors.textSecondary}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write a description for your video..."
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <View style={{ position: 'relative' }}>
              <Hash size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Add hashtags (e.g., #travel #food #music)"
                placeholderTextColor={colors.textSecondary}
                value={hashtags}
                onChangeText={setHashtags}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.publishButton, !isFormValid && styles.disabledButton]}
            onPress={handlePublish}
            disabled={!isFormValid}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
              <Upload size={20} color="#FFFFFF" />
              <Text style={styles.publishButtonText}>Publish Video</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}