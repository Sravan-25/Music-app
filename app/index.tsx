import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Redirect href={'/Landing'} />
      <Redirect href={'/SignUpPage'} />
      <Redirect href={'/OtpVerify'} />
      <Redirect href={'/pages/Home'} />
      <Redirect href={'/pages/SharedAccess'} />
      <Redirect href={'/pages/Settings'} />
      <Redirect href={'/settingsPages/AboutUs'} />
      <Redirect href={'/settingsPages/PrivacyPolicy'} />
      <Redirect href={'/settingsPages/Terms'} />
    </View>
  );
}
