import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography } from '@/constants/Colors';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail?: string;
  autoPlay?: boolean;
  showControls?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export default function VideoPlayer({ 
  videoUrl, 
  thumbnail, 
  autoPlay = false, 
  showControls = true 
}: VideoPlayerProps) {
  const { colors } = useTheme();
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [showControlsOverlay, setShowControlsOverlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 200,
      backgroundColor: colors.surface,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    controlsOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    playButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(16, 185, 129, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomControls: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Spacing.sm,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    controlButton: {
      padding: Spacing.xs,
    },
    loadingText: {
      color: '#FFFFFF',
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.medium,
      marginTop: Spacing.sm,
    },
  });

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = async () => {
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const handleVideoPress = () => {
    if (showControls) {
      setShowControlsOverlay(!showControlsOverlay);
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleVideoPress} activeOpacity={0.9}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: videoUrl }}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isPlaying}
        isLooping
        isMuted={isMuted}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
      />
      
      {(showControlsOverlay || isLoading) && showControls && (
        <View style={styles.controlsOverlay}>
          {isLoading ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
              {isPlaying ? (
                <Pause size={24} color="#FFFFFF" fill="#FFFFFF" />
              ) : (
                <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
              )}
            </TouchableOpacity>
          )}
        </View>
      )}

      {showControlsOverlay && showControls && !isLoading && (
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleMuteToggle}>
            {isMuted ? (
              <VolumeX size={20} color="#FFFFFF" />
            ) : (
              <Volume2 size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Maximize size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}