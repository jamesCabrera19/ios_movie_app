import { View, Text, Button, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function NotFoundVideo({ poster_path }) {
    return (
        <>
            <View
                style={{
                    height: 50,
                    backgroundColor: "red",
                    marginTop: 100,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 40,
                        alignSelf: "center",
                    }}
                >
                    No Movie Was Found!
                </Text>
            </View>
            <View
                style={{
                    height: 40,
                    backgroundColor: "red",
                    marginTop: 100,
                }}
            >
                <Button
                    title="Download Wallpaper Instead?"
                    color="white"
                    onPress={() => {
                        Alert.alert(`Save Wallpaper?`, "", [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                            },
                            {
                                text: "Download",
                                onPress: async () => {
                                    // No permissions request is necessary for saving the image to the library
                                    try {
                                        await MediaLibrary.saveToLibraryAsync(
                                            `https://image.tmdb.org/t/p/original${poster_path}`
                                        );
                                        Alert.alert("Saved to pictures!");
                                    } catch (error) {
                                        console.log(error);
                                        return;
                                    }
                                },
                            },
                        ]);
                    }}
                />
            </View>
        </>
    );
}
