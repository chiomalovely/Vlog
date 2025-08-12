import React from 'react';
import NativeAdComponent from './NativeAd';

interface AdBannerProps {
  size?: 'banner' | 'largeBanner' | 'mediumRectangle';
  style?: any;
}

export default function AdBanner({ size = 'banner', style }: AdBannerProps) {
  // For native ads, we'll use the same component regardless of size
  // The native ad will automatically adjust its layout
  return <NativeAdComponent style={style} />;
}