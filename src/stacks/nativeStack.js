// system imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// components/screen
import VideoScreen from "../screens/videoScreen";
import PurchaseScreen from "../screens/purchaseScreen";
//
const Stack = createNativeStackNavigator();
//
export default function NativeStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PurchaseScreen"
                component={PurchaseScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="VideoScreen"
                component={VideoScreen}
                options={{
                    headerTitleStyle: {
                        fontWeight: "bold",
                        color: "black",
                    },
                    headerTitle: "",
                    headerShown: true,
                    headerShadowVisible: true,
                    headerTransparent: true, // leave ON to show btn

                    headerLeft: (props) => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View
                                style={{
                                    backgroundColor: "white",
                                    borderColor: "white",
                                    borderWidth: 1,
                                    borderRadius: "50%",
                                    height: 35,
                                    width: 35,
                                }}
                            >
                                <AntDesign
                                    style={{ paddingTop: 1 }}
                                    name="left"
                                    size={30}
                                    color="black"
                                />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
