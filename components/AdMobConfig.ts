import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

// AdMob configuration
export const ADMOB_CONFIG = {
  APP_ID: 'ca-app-pub-3525464829772650~3611777643',
  REWARDED_VIDEO_ID: 'ca-app-pub-3525464829772650/3262848696',
  NATIVE_AD_ID: 'ca-app-pub-3525464829772650/9074476369',
};

// Initialize AdMob
export const initializeAdMob = async () => {
  try {
    await mobileAds().initialize();
    
    // Set app settings
    await mobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });
    
    console.log('AdMob initialized successfully');
    return true;
  } catch (error) {
    console.error('AdMob initialization failed:', error);
    return false;
  }
};