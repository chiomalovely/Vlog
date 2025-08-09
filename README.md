# VlogSnap - Video Sharing App

A modern video sharing platform built with Expo Router and React Native.

## Features

- 📱 Cross-platform (iOS, Android, Web)
- 🎥 Video upload and sharing
- 💬 Real-time messaging
- 🔍 Content discovery
- 👤 User profiles and authentication
- 🎨 Beautiful, responsive design
- 📊 Creator monetization

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

### Development Commands

- `npm run start` - Start the Expo development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start web version
- `npm run lint` - Run ESLint

### Building for Production

- `npm run build:web` - Build for web deployment
- `npm run build:android` - Build Android app (requires EAS)
- `npm run build:ios` - Build iOS app (requires EAS)

## Project Structure

```
├── app/                    # App routes (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   ├── auth/              # Authentication screens
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point
├── components/            # Reusable components
├── constants/             # App constants and themes
├── hooks/                 # Custom React hooks
└── assets/               # Static assets
```

## Tech Stack

- **Framework**: Expo with Expo Router
- **Language**: TypeScript
- **Styling**: React Native StyleSheet
- **Icons**: Lucide React Native
- **Fonts**: Inter (Google Fonts)
- **Navigation**: Expo Router with tabs
- **State Management**: Zustand (ready to use)
- **Animations**: React Native Reanimated

## Key Features

### Authentication
- Email/password registration and login
- Google OAuth integration ready
- Secure user session management

### Video Features
- Short videos (≤4 minutes) and long-form content (≤10 hours)
- Camera recording and gallery selection
- Video metadata and hashtags

### Social Features
- Real-time messaging
- User profiles and following system
- Content discovery and trending

### Monetization
- Creator earnings dashboard
- Ad revenue tracking
- Monetization program integration

## Development Tips

1. **Testing on Device**: Use Expo Go for quick testing, or create a development build for full feature access
2. **Camera Features**: Camera functionality requires physical device testing
3. **Performance**: Use React Native Reanimated for smooth animations
4. **Debugging**: Use Flipper or React Native Debugger for advanced debugging

## Deployment

This project is configured for deployment with:
- **Web**: Static export ready
- **Mobile**: EAS Build for app store deployment
- **Backend**: Ready for Supabase integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details