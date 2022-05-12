import {
    Text,
    View,
    Alert,
    TouchableOpacity,
    Switch,
    Button,
    Share,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

import { EvilIcons, Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//
export function RoundButton({ title, color, credits, action }) {
    // exported to addCredits, purchaseScreen, useScreen
    return (
        <View
            style={{
                backgroundColor: color,
                width: "90%",
                height: 50,
                padding: 5,
                alignItems: "center",
                borderRadius: 30,
            }}
        >
            <Button
                color="#fff"
                title={title}
                onPress={action}
                disabled={credits > 0 ? false : true}
            />
        </View>
    );
}

export function SquareButton({ title, isTop, screenName }) {
    // exports to settingsScreen
    const navigation = useNavigation();

    const addStyle = {
        borders: isTop
            ? { borderTopEndRadius: 5, borderTopStartRadius: 5 }
            : {
                  borderTopWidth: 0.2,
                  borderBottomStartRadius: 5,
                  borderBottomEndRadius: 5,
              },
    };
    return (
        <TouchableOpacity
            style={[
                {
                    backgroundColor: "rgb(245, 245, 247)", // white-ish
                    width: "90%",
                    height: 50,
                    paddingHorizontal: 6,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopWidth: 0.2,
                },
                addStyle.borders,
            ]}
            onPress={() =>
                navigation.navigate("ModalStack", {
                    screen: screenName,
                })
            }
        >
            <Text style={{ color: "black", fontSize: 18 }}>{title}</Text>
            <AntDesign name="right" size={24} color="grey" />
        </TouchableOpacity>
    );
}

export function MySwitch({ border, title, setHook, hook, colors }) {
    // exports to settingsScreen
    const styles = {
        button: {
            backgroundColor: "rgb(245, 245, 247)", // white-ish
            width: "90%",
            height: 50,
            paddingHorizontal: 6,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            borderTopWidth: 0.2,
        },
        text: {
            color: "black",
            fontSize: 18,
        },
    };

    const renderStyle = (border) => {
        switch (border) {
            case "isTop":
                return {
                    borderTopStartRadius: 5,
                    borderTopEndRadius: 5,
                    borderTopWidth: 0.2,
                };
            case "isBottom":
                return {
                    borderBottomStartRadius: 5,
                    borderBottomEndRadius: 5,
                    borderTopWidth: 0.2,
                    height: 40,
                };
            default:
                return;
        }
    };
    return (
        <View style={[styles.button, renderStyle(border)]}>
            <Text style={styles.text}>{title}</Text>
            <Switch
                trackColor={{
                    false: colors.switchFalse,
                    true: colors.switchTrue,
                }}
                thumbColor={colors.thumbColor}
                ios_backgroundColor={colors.background}
                onValueChange={() => setHook((prevState) => !prevState)}
                value={hook}
            />
        </View>
    );
}

export function RoundOpacity({ title, action, iconName, size, color }) {
    return (
        <TouchableOpacity onPress={action}>
            <View
                style={{
                    backgroundColor: color ? color : "#fff",
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 10,
                    marginHorizontal: 10,
                    borderRadius: 4,
                }}
            >
                <Entypo name={iconName} size={size ? size : 13} color="white" />
                <Text style={{ color: "white" }}> {title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export function ShareButton({ movieObject, color }) {
    // * Share Movie
    const shareMovie = async (itemToShare) => {
        try {
            const result = await Share.share({
                message: `${itemToShare.title},\n A React Native App created by James Cabrera, contact at 'jamescabrera.io'`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    console.log(result.activityType);
                    // Object {
                    //     "action": "sharedAction",
                    //     "activityType": "com.apple.UIKit.activity.Message",
                    //   }
                } else {
                    // shared
                    console.log(result.activityType);
                }
            } else if (result.action === Share.dismissedAction) {
                // USER has dismissed share
                console.log("dismissed");
            }
        } catch (error) {
            console.log("error,", error);
        }
    };
    return (
        <TouchableOpacity onPress={() => shareMovie(movieObject)}>
            <EvilIcons
                name="share-apple"
                size={35}
                color={color ? color : "white"}
            />
        </TouchableOpacity>
    );
}

export function DownloadWallpaper({ poster_path, size, color }) {
    return (
        <TouchableOpacity
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
                            }
                        },
                    },
                ]);
            }}
        >
            <Entypo
                name="download"
                size={size ? size : 13}
                color={color ? color : "white"}
            />
        </TouchableOpacity>
    );
}
