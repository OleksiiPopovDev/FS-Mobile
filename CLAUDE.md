# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FS-Mobile (Fitness Server Mobile) is a React Native application built with Expo SDK 53. It uses TypeScript, NativeWind for styling, and WatermelonDB for offline-first data persistence.

## Essential Commands

### Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Platform-specific development
npm run ios        # iOS on port 9091
npm run android    # Android on port 9092

# Build development versions
npm run ios:build:dev      # Local iOS build
npm run android:build:dev  # Local Android build

# EAS builds for testing
npm run ios:build      # iOS development build via EAS
npm run android:build  # Android development build via EAS
```

### Code Quality
```bash
# Run linting
npm run lint

# TypeScript checking (no dedicated command - TypeScript runs in strict mode)
npx tsc --noEmit
```

## Architecture Overview

### Navigation Structure
The app uses Expo Router (file-based routing) with the following key routes:
- `/app/_layout.tsx` - Root layout with stack navigation
- `/app/index.tsx` - Entry point/home screen
- `/app/login/` - Authentication flow (Google OAuth)
- `/app/dashboard/` - Main dashboard after login

### Data Layer
- **Database**: WatermelonDB with repository pattern
- **Models**: Located in `/app/database/model/` (users, limits)
- **Repository**: `/app/database/repository/` provides data access abstraction
- **Migrations**: Database schema versioning in `/app/database/migrations/`

### Component Organization
Two parallel component structures exist:
1. `/components/` - Expo starter components and common UI
2. `/src/components/` - Atomic design pattern:
   - `atoms/` - Basic UI elements
   - `molecules/` - Composite components
   - `organisms/` - Complex UI sections

### State Management
- React Context API for global state
- Contexts defined in `/src/context/`
- Custom hooks in `/hooks/` and `/src/hooks/`

### Styling System
- **NativeWind**: Tailwind CSS for React Native
- **Theme**: Color constants in `/constants/Colors.ts`
- **Responsive**: useColorScheme hook for dark/light mode

### Authentication
- Google OAuth via `expo-auth-session`
- Auth flow starts in `/app/login/`
- User data persisted in WatermelonDB

## Development Guidelines

### Module Resolution
- Use `@/` alias for imports from project root
- Example: `import { Button } from '@/components/Button'`

### Platform-Specific Code
- iOS-specific code in `/ios/`
- Android-specific code in `/android/`
- Use platform detection when needed: `Platform.OS === 'ios'`

### Database Operations
Always use the repository pattern for database operations:
```typescript
import { UserRepository } from '@/app/database/repository/UserRepository';
```

### Environment Variables
- Configured via `react-native-dotenv`
- Create `.env` file in project root for local development

### Build Configuration
- EAS Build configured with development profiles
- Expo plugins configured in `app.json`
- WatermelonDB requires native rebuild when schema changes

## Current Development State
The project is actively implementing:
- Bottom tab navigation
- Animated side menu
- Dashboard features
- Blue theme implementation
- Training page functionality

When working on these features, check the temporary implementation files in the root directory for context.