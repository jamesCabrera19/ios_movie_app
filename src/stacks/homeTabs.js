// system imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
// components/screens
import HomeScreen from "../screens/homeScreen";
import SettingsScreen from "../screens/settingsScreen";
import SearchScreen from "../screens/searchScreen";
import MyMovies from "../screens/myMovies";
//
const Tab = createBottomTabNavigator();
//

export default function HomeTabs() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={colors.activeColor}
            screenOptions={
                ({
                    detachInactiveScreens: true,
                },
                ({ route }) => {
                    return {
                        tabBarIcon: ({ color }) => {
                            const icon = {
                                // ScreenName: 'icon_name'
                                Home: "home",
                                Settings: "setting",
                                Search: "search1",
                                Movies: "videocamera",
                            };

                            return (
                                <AntDesign
                                    name={icon[route.name]}
                                    color={color}
                                    size={24}
                                />
                            );
                        },
                    };
                })
            }
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.activeColor,
                    tabBarInactiveTintColor: colors.inactiveColor,
                }}
            />

            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.activeColor,
                    tabBarInactiveTintColor: colors.inactiveColor,
                }}
            />
            <Tab.Screen
                name="Movies"
                component={MyMovies}
                options={{
                    headerShown: false,
                    tabBarLabel: "My Movies",
                    tabBarActiveTintColor: colors.activeColor,
                    tabBarInactiveTintColor: colors.inactiveColor,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.activeColor,
                    tabBarInactiveTintColor: colors.inactiveColor,
                }}
            />
        </Tab.Navigator>
    );
}
