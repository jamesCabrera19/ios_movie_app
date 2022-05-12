import { useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import { Provider as MovieProvider } from "./src/context/dataContext";
import { Provider as ActionsProvider } from "./src/context/actionsContext";
import { Provider as AuthProvider } from "./src/context/authContext";
//
import { Context as MovieDataContext } from "./src/context/dataContext";
import { Context as AuthContext } from "./src/context/authContext";
import { Context as MovieActionContext } from "./src/context/actionsContext";

//
import MyTabs from "./src/stacks/indexStack";
import AuthStack from "./src/stacks/authStack";
//
const Stack = createNativeStackNavigator();
//
function App() {
    const { fetchMovies, fetchGenres, renderResult } =
        useContext(MovieDataContext);
    const { addMovies } = useContext(MovieActionContext);
    const {
        state: { token, userMovies },
        autoSignin,
    } = useContext(AuthContext);

    const scheme = useColorScheme();

    const MyTheme = {
        dark: scheme === "light" ? DefaultTheme : DarkTheme,
        colors: {
            authBackground: "rgb(62, 66, 76)",
            primary: "rgb(255, 45, 85)", // red-pink
            background: "rgb(42, 44, 51)", // dark
            fontColor:
                scheme === "dark" ? "rgb(255, 255, 255)" : "rgb(255, 255, 255)",
            fontTitleWeight: "900",
            // bottom tabs only
            activeColor: "rgb(230, 89, 137)",
            inactiveColor: "rgb(155, 155, 155)", //pink-ish
            // settings page
            iconColor: "rgb(230, 89, 137)",
            switchFalse: "rgb(118, 117, 119)",
            switchTrue: "rgb(129, 175, 255)",
            thumbColor: "rgb(244, 243, 244)",
            button: "rgb(235, 99, 149)",
            purchaseBtn: "rgb(51, 156, 0)",
        },
    };

    useEffect(() => {
        // autoSignin(); // enabling this function will result in myMovies state [{}] to be cleared out when user exists the app.
        // movies stored in db will not be displayed under <myMovies/> unless they are re-fetched
        renderResult(11);
        fetchMovies();
        fetchGenres();
    }, [userMovies]); // runs as expected

    useEffect(() => {
        addMovies(userMovies); // appeding User Saved Movies (movies stored in db) to local state
    }, [userMovies]); // runs only when userMovies changes
    return (
        <NavigationContainer theme={MyTheme}>
            {token ? (
                <Stack.Navigator>
                    <Stack.Screen
                        name="AppTabsScreen"
                        component={MyTabs}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}

export default () => {
    return (
        <AuthProvider>
            <ActionsProvider>
                <MovieProvider>
                    <App />
                </MovieProvider>
            </ActionsProvider>
        </AuthProvider>
    );
};
