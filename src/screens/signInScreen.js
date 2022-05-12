import { useContext, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
//
import { Context as AuthContext } from "../context/authContext";
import AuthForm from "../components/authForm";
import AuthLink from "../components/authLink";
import Loader from "../components/loader";
//
export default function SignInScreen({ navigation }) {
    const { state, signIn, clearError } = useContext(AuthContext);
    const { colors } = useTheme();

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            return () => {
                // Useful for cleanup functions
                // Do something when the screen is unfocused
                clearError();
            };
        }, [])
    );

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.authBackground,
        },
        text: { fontSize: 25 },
        err: {
            color: "red",
        },
    });
    return (
        <>
            {state.loading === "loading" ? (
                <Loader />
            ) : (
                <View style={styles.container}>
                    <AuthForm
                        headerText="Welcome!"
                        errorMessage={state.errorMessage}
                        onSubmit={signIn}
                        btnText="Sign In!"
                    />
                    <AuthLink
                        text="Don't have an account? Sign up instead!"
                        routeName="SignUpScreen"
                    />
                </View>
            )}
        </>
    );
}
