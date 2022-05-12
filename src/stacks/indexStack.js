// system imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// components/screen
import ModalStack from "./modalStack";
import HomeTabs from "./homeTabs";
import NativeStack from "./nativeStack";
//
const Stack = createNativeStackNavigator();
//

function MyTabs() {
    // read more at https://reactnavigation.org/docs/stack-navigator/#animations
    return (
        <>
            <Stack.Navigator
                initialRouteName="HomeTabsStack"
                screenOptions={({ route, navigation }) => ({
                    presentation: "transparentModal",
                    detachPreviousScreen: true,
                })}
            >
                <Stack.Screen
                    name="HomeTabsStack"
                    component={HomeTabs}
                    options={{ headerShown: false }}
                />

                <Stack.Group>
                    <Stack.Screen
                        name="NativeStack"
                        component={NativeStack}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Group>

                <Stack.Group
                    screenOptions={{
                        presentation: "modal",
                        animationEnabled: true,
                        animationTypeForReplace: "pop",
                    }}
                >
                    <Stack.Screen
                        name="ModalStack"
                        component={ModalStack}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </>
    );
}
export default MyTabs;
