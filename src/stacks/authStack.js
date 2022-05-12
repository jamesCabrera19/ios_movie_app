import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import SignInScreen from "../screens/signInScreen";
import SignUpScreen from "../screens/signUpScreen";
//
const HomeStack = createNativeStackNavigator();

function AuthStack() {
    // LOGIN SCREENS
    return (
        <HomeStack.Navigator initialRouteName="SignInScreen">
            <HomeStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    headerShown: true,
                    headerBackTitle: "Sign In",
                    headerTitle: "",
                    headerBlurEffect: "prominent",
                }}
            />
            <HomeStack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
            />
        </HomeStack.Navigator>
    );
}

export default AuthStack;
