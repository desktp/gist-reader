## Gist QR Reader
#### Features
* Login with OAuth
* QR Code reader
* Read gists and submit comments

You can create a QR Code for your gist [here](http://www.qr-code-generator.com/).
#### Install dependencies
```
$ npm install
$ npm i fullstackreact/react-native-oauth#pull/121/head
```
Edit the file `node_modules/react-native-oauth/android/src/main/java/io/fullstack/oauth/OAuthManagerModule.java`, change line `410` from to
```
String oauthTokenSecret = (String) accessToken.getTokenSecret();
```
Link native assets with:
```
$ react-native link react-native-camera
$ react-native link react-native-qrcode-scanner 
$ react-native link react-native-oauth 
```
Run the project with 
```
$ react-native run-android
```