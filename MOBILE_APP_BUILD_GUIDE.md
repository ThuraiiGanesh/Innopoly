# 📱 StyleSync AI - iOS App Store & Google Play Store Mobile Build Guide

This directory has been configured with **Capacitor 7** to package the StyleSync AI application into downloadable native binary packages for **iOS (Apple App Store)** and **Android (Google Play Store)**.

> ℹ️ Note: A backup copy of the standalone web version has been created at `innopoly-website`.

---

## 🛠️ Prerequisites

1. **Node.js** (v18 or higher)
2. **Android Studio** (For building Android APK / AAB bundles for Google Play Store)
   * Java Development Kit (JDK 17+)
   * Android SDK Platform 34+
3. **Xcode** (For building iOS IPA bundles for Apple App Store - requires macOS)
   * Apple Developer Account (for App Store sign-off)

---

## 🚀 Quick Commands

### 1. Build Production App Bundle
```bash
npm run build
```

### 2. Add Native Platforms (First-Time Setup)

#### For Google Play Store (Android):
```bash
npx cap add android
```

#### For Apple App Store (iOS):
```bash
npx cap add ios
```

---

## 🤖 Building Android Package (.apk / .aab for Google Play Store)

1. Sync web files to Android project:
   ```bash
   npm run cap:android
   ```

2. Open in Android Studio:
   ```bash
   npm run cap:open:android
   ```

3. In Android Studio:
   - Go to **Build** -> **Generate Signed Bundle / APK**.
   - Choose **Android App Bundle (.aab)** for Google Play Store submission, or **APK** for direct download/sideloading.
   - Select your Keystore certificate.
   - Click **Build**. Your release `.aab` will be saved in `android/app/release/app-release.aab`.

---

## 🍏 Building iOS Package (.ipa for Apple App Store)

1. Sync web files to iOS Xcode project:
   ```bash
   npm run cap:ios
   ```

2. Open in Xcode (on macOS):
   ```bash
   npm run cap:open:ios
   ```

3. In Xcode:
   - Select your Signing Team under **Signing & Capabilities**.
   - Set build target to **Any iOS Device (arm64)**.
   - Go to **Product** -> **Archive**.
   - Once archived, click **Distribute App** -> **App Store Connect** to upload directly to Apple TestFlight / App Store.

---

## 📄 App Configuration Summary

- **App ID (Bundle Identifier):** `com.stylesync.innopoly`
- **App Name:** `StyleSync AI`
- **Capacitor Configuration File:** `capacitor.config.json`
- **Web Build Folder:** `dist`
