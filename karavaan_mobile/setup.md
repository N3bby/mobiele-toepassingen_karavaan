# Setup guide

## npm packages

Install react-native-cli globally
```
npm install -g react-native-cli
```

## Android SDK

Install the android cli tools from here:
https://developer.android.com/studio/index.html#downloads

### Windows:

1. Create a new folder 'android-sdk'
2. Extract the zip file into this so that you have 'android-sdk/tools'
3. Go to your environment variables and configure a new variable ANDROID_HOME to point to the android-sdk folder

### Mac

Sorry

## Java 

Make sure your Java path variable points to a JDK and not a JRE

# Running

For some reason, I get errors about not being able to load certain files on my android device.
This can be remedied by executing this command before running the application
```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

After that, run normally using
```
react-native run-android
```
