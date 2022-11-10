<!-- Build APK -->

cd android
./gradlew assembleRelease

cd android
./gradlew uninstallAll

./gradlew clean

cd client

npx react-native start
npx react-native run-android

<!-- sequelize -->

npx sequelize-cli db:migrate
