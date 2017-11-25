# Setup guide

## npm packages

Install react-native-cli globally
```
npm install -g react-native-cli
```

Do an npm install inside the project
```
npm install
```

Then execute the following command. (idk why exactly)
```
react-native link
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

Run using (while having an emulator runnig or a device attached)
```
react-native run-android
```
or
```
react-native run-ios
```
