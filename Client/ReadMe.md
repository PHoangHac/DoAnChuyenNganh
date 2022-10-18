<!-- Build APK -->

cd android
./gradlew assembleRelease

npx react-native start
npx react-native run-android
