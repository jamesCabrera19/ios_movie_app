import { useContext, useCallback } from "react";

import { StyleSheet, View } from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
//
import { Context as AuthContext } from "../context/authContext";
import AuthForm from "../components/authForm";
import Loader from "../components/loader";
//
export default function SignUpScreen({ navigation }) {
    const { state, signUp, clearError } = useContext(AuthContext);
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
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.authBackground,
        },
        text: { fontSize: 25 },
    });

    return (
        <>
            {state.loading === "loading" ? (
                <Loader />
            ) : (
                <View style={styles.container}>
                    <AuthForm
                        headerText="Sign up!"
                        errorMessage={state.errorMessage}
                        onSubmit={signUp}
                        btnText="Sign Up!"
                    />
                </View>
            )}
        </>
    );
}
