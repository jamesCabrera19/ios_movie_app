// system imports
import { useContext, useState, useCallback } from "react";
import { Text, View, Alert } from "react-native";
import { useTheme, useFocusEffect } from "@react-navigation/native";
// context
import { Context as AuthContext } from "../context/authContext";
// components
import Spacer from "../components/spacer";
import { RoundButton } from "../components/Buttons";
import CustomSelector from "../components/selector";
import Loader from "../components/loader";
//

export default function AddCredits({ navigation }) {
    const { state, addCredits } = useContext(AuthContext);
    const [credits, setCredits] = useState(0);
    const { colors } = useTheme();

    // ! known bugs
    // 1) even if user fails to authenticate user will get pushed to 'Purchase Screen'
    // 2) addCredits fails to dispatch error
    // * note if this occurs // credits will not be credited to users account
    // * possible solutions
    // 1) somehow authenticate user prior to making api call ??
    // 2) await for response (true/false) before pushing user to 'Purchase Screen'
    const createTwoButtonAlert = () => {
        Alert.prompt(
            "Enter password",
            `Confirm Credits: ${credits}`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Purchase",
                    onPress: (password) => {
                        // make post request to update number of credits
                        const user = {
                            email: state.email,
                            token: state.token,
                            password,
                            credits,
                        };
                        addCredits(user);
                        // console.log(state.errorMessage);
                        // if (state.errorMessage) {
                        //     console.log(
                        //         "state.errorMessage: ",
                        //         state.errorMessage
                        //     );
                        //     // navigation.navigate("NativeStack", {
                        //     //     screen: "PurchaseScreen",
                        //     //     params: { credits: credits },
                        //     // });
                        // }
                    },
                },
            ],
            "secure-text"
        );
    };

    useFocusEffect(
        useCallback(() => {
            // screen is in focus
            // console.log(state);
            return () => {
                // screen is in unfocus
                setCredits(0);
            };
        }, [])
    );

    return (
        <>
            {state.loading === "loading" || state.loading === undefined ? (
                <Loader />
            ) : (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: colors.fontColor,
                            fontWeight: colors.fontTitleWeight,
                            padding: 30,
                            alignSelf: "center",
                        }}
                    >
                        {state.email}
                    </Text>
                    <Text
                        style={{
                            fontWeight: colors.fontTitleWeight,
                            color: colors.fontColor,
                            alignSelf: "center",
                        }}
                    >
                        You have {state.credits} credits left
                    </Text>
                    <Spacer />
                    <CustomSelector
                        selectedNumber={setCredits}
                        credits={credits}
                        color={colors.iconColor}
                    />
                    <Spacer />
                    <RoundButton
                        title="Add Credits"
                        color={colors.button}
                        action={createTwoButtonAlert}
                        credits={credits}
                    />
                </View>
            )}
        </>
    );
}
