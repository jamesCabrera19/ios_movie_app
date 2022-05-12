// system imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// components/screen
import AddCredits from "../screens/addCredits";
import UserScreen from "../screens/userScreen";
import MovieResultScreen from "../screens/movieResult";
//

const Stack = createNativeStackNavigator();

export default function ModalStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MovieScreen"
                component={MovieResultScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddCreditsScreen"
                component={AddCredits}
                options={{
                    headerShown: true,
                    headerTitle: "Add More Credits",
                }}
            />

            <Stack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ headerShown: true, headerTitle: "Account Settings" }}
            />
        </Stack.Navigator>
    );
}
