# Personal Expense Tracker

A React Native mobile application for tracking personal expenses with features like expense categorization, summaries, and visualization.

## Features

- Add new expenses with amount, category, and date
- View expense summary by category
- Recent expenses list
- Clean and modern UI
- Cross-platform (iOS & Android)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or newer)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (or any preferred code editor)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Installation Steps

1. **Create a new project directory and clone the repository**
   ```bash
   mkdir expense-tracker
   cd expense-tracker
   git init
   ```

2. **Initialize a new Expo project**
   ```bash
   npx create-expo-app .
   ```

3. **Install required dependencies**
   ```bash
   npx expo install @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
   npx expo install @react-native-picker/picker
   npx expo install @react-native-community/datetimepicker
   npx expo install react-native-sqlite-storage
   npx expo install @expo/vector-icons
   npx expo install sonner-native
   ```

4. **Configure the project structure**
   Create the following directories:
   ```bash
   mkdir src
   cd src
   mkdir components
   mkdir screens
   mkdir constants
   ```

5. **Copy the project files**
   - Copy all the provided component files into their respective directories
   - Ensure the file structure matches the imports

6. **Start the development server**
   ```bash
   npx expo start
   ```

7. **Running on different platforms**
   - Press `i` to run on iOS simulator (requires macOS and Xcode)
   - Press `a` to run on Android emulator (requires Android Studio)
   - Scan the QR code with Expo Go app on your physical device

## Troubleshooting

If you encounter any issues:
- Ensure all dependencies are properly installed
- Clear the Metro bundler cache: `npx expo start -c`
- Make sure your development environment meets Expo's requirements
- Check that all imports are correct and files are in their proper locations

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.