import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@screens/Login/LoginScreen';
import SignUp1 from '@screens/Login/SignUp1';
import SignUp2 from '@screens/Login/SignUp2';
import SocialSignUp1 from '@screens/Login/SocialSignUp1';

const Stack = createNativeStackNavigator();
function LoginNav(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" options={{headerShown: false}}>
          {(props: any) => <LoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp1" options={{headerShown: false}}>
          {(props: any) => <SignUp1 {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp2" options={{headerShown: false}}>
          {(props: any) => <SignUp2 {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SocialSignUp1" options={{headerShown: false}}>
          {(props: any) => <SocialSignUp1 {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default LoginNav;
