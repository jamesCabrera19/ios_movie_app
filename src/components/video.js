// system imports
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Video } from "expo-av";
import { Context as AuthContext } from "../context/authContext";
// import useTimeout from "../hooks/useTimeout";
import useInterval from "../hooks/useInterval";

export default function Youtube({ link }) {
    const navigation = useNavigation();
    const {
        removeCredits,
        state: { credits, email, token },
    } = useContext(AuthContext);

    // const isFocused = useIsFocused();

    // *  Native Player
    const video = useRef(null); // Video Player
    const [status, setStatus] = useState({}); // Video Player
    const [btn, setBtn] = useState(false); // Video Player

    const [totalDuration, setTotalDuration] = useState(0);

    useInterval(() => {
        const handleTime = () => {
            let maxLimit = Math.round(totalDuration * 0.2);
            let currentPosition =
                status.positionMillis > maxLimit
                    ? null
                    : status.positionMillis + 500; // currentPosition + 500 (milliseconds) is a calibration value

            if (currentPosition > maxLimit) {
                // ! known bug => currentPosition fails to be register as > maxlimit, which in return removeCredit() fails to execute.
                // ! known bug => if user moves "currentPosition" below the max limit again this will cause to execute removeCredit() multiple times
                // * options to fix bug
                // ? 1. remove credit onReadyForDisplay => this will guarantee to remove credit ONCE video becomes available
                // ? 2. remove credit on status.didJustFinish => this will guarantee to remove credit ONCE video ends
                removeCredits({
                    amount: 1,
                    email,
                    token,
                });
            }

            return null;
        };
        handleTime();
    }, 1000);

    if (!video) {
        return <ActivityIndicator size="large" style={{ paddingTop: 50 }} />;
    } else {
        return (
            <>
                {credits > 0 ? (
                    <>
                        <Video
                            ref={video}
                            style={{
                                alignSelf: "center",
                                width: 400,
                                height: 200,
                            }}
                            source={{ uri: link.url }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping={false}
                            onReadyForDisplay={() => {
                                // A function to be called when the video is ready for display
                                setTotalDuration(status.durationMillis);
                                // removeCredits({
                                //     amount: 1,
                                //     email,
                                //     token,
                                // });
                            }}
                            onPlaybackStatusUpdate={(status) => {
                                setStatus(() => status);
                                // calculateTime(totalDuration, status);
                                if (status.didJustFinish) {
                                    // removeCredits({
                                    //     amount: 1,
                                    //     email,
                                    //     token,
                                    // });
                                    navigation.goBack();
                                }
                            }}
                        />
                    </>
                ) : (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "red",
                            flexWrap: "wrap",
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 20 }}>
                            Please add more credits to keep watching!
                        </Text>
                        <Button
                            title="Add More Credits?"
                            onPress={() => {
                                navigation.navigate("ModalStack", {
                                    screen: "AddCreditsScreen",
                                });
                            }}
                        />
                    </View>
                )}
            </>
        );
    }
}
