# CTIP-App-ReactNative
## Software Used
1. React Native (Mobile App developement)
2. Node.js (Run on localhost): https://nodejs.org/en/download/prebuilt-installer/current
## Dependencies
1. All Dependencies are installed in node modules already.
2. Make sure Expo Go in mobile phone is SDK51 version ( Link to download: https://expo.dev/go?sdkVersion=51&platform=android&device=true)
3. This project requires the following dependencies:
- `express`
- `mysql`
- `body-parser`
- `cors`
- `bcrypt`
- `jsonwebtoken`
- `nodemailer`
- `crypto`
- `react`
- `react-native`
- `react-native-vector-icons`
- `@react-navigation/native`
- `react-i18next`
- `axios`
- `react-native-picker-select`
- `react-native-gesture-handler`
- `expo-av`
- `@react-native-picker/picker`
- `@react-native-community/datetimepicker`
- `react-native-webview`
- `react-native-awesome-alerts`

4. Full dependencies installation
npm install express mysql body-parser cors bcrypt jsonwebtoken nodemailer crypto react react-native react-native-vector-icons @react-navigation/native react-i18next axios react-native-picker-select react-native-gesture-handler expo-av @react-native-community/datetimepicker @react-native-picker/picker react-native-webview react-native-awesome-alerts
5. If there's any missing dependencies, type npm install <library>.


## How to Setup
1. Run Apache and MySQL in XAAMP.
2. Open VS Code and locate SemenggohApp directory.
3. Make sure mobile phone and Dekstop/Laptop are linked to the same internet connection.
4. Open Command Prompt, type ipconfig. Copy paste IPv4 Address and paste it in API_BASE_URL: 'http://<IP Adress>:3001/api' under config.js.
5. Change the email in server.js under "const insertAdminSql" to your respective email to enable OTP sent to your email when admin login
6. Open 3 terminals in VSC
7. Type "cd backend" and "node server.js" to enable the creation of tables in "semenggoh" database (1st Terminal).
8. Type "cd backend" and "node backup.js" to allow real-time database backup in JSON file (2nd Terminal).
9. Type "npm start" and scan the QR Code shown using Expo Go (SDK51 version).
10. Admin Credentials:
    - Username: admin
    - Password: 1
11. Due to the IoT Kit has been dismantle, "sensor_readings.sql" can be use to create the table in database.
12. Navigate to "http://localhost/phpmyadmin/index.php?route=/server/databases" and click "semenggoh". Import "sensor_readings.sql" into databse by clicking "Import" button on top and select "sensor_readings.sql".
13. Everything should run a expected.
