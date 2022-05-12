// system imports
import { useState, useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@react-navigation/native";
import ModalSelector from "react-native-modal-selector";

//
import { Context as AuthContext } from "../context/authContext";
import { Context as MovieDataContext } from "../context/dataContext";

// components
import Spacer from "../components/spacer";
import { SquareButton, MySwitch } from "../components/Buttons";

export default function SettingsScreen({ navigation }) {
    const { state, signOut } = useContext(AuthContext);
    const {
        renderResult,
        state: { maxResults },
    } = useContext(MovieDataContext);

    const [isEnabled, setIsEnabled] = useState(false);
    const [image, setImage] = useState(null);
    const { colors } = useTheme();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 5, // 0 highest, 5 lowest
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const styles = {
        container: {
            alignItems: "center",
            justifyContent: "center",
        },
        image: { height: 100, width: 100, borderRadius: 50 },
    };

    let index = 0;
    const data = [
        {
            key: index++,
            section: true,
            label: "Results",
        },
        // { key: index++, label: "1 Credit" },
        { key: (index = 11), label: "11" },
        { key: (index = 13), label: "13" },
        { key: (index = 17), label: "17" },
        { key: (index = 19), label: "Max" },

        // etc...
        // Can also add additional custom keys which are passed to the onChange callback
    ];

    return (
        <View style={[styles.container, { flex: 1 }]}>
            <View style={styles.container}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        style={styles.image}
                        source={
                            image
                                ? { uri: image }
                                : require("../imgs/not_found.jpg")
                        }
                    />
                </TouchableOpacity>
                <Spacer>
                    <Text style={{ color: "grey", fontSize: 18 }}>
                        {state.email}
                    </Text>
                </Spacer>
            </View>

            <Spacer />
            <Spacer />
            <SquareButton
                isTop={true}
                title="Name, Email, Password"
                screenName="UserScreen"
            />
            <SquareButton
                isTop={false}
                title="Subscriptions"
                screenName="AddCreditsScreen"
            />
            <Spacer />
            <MySwitch
                border="isTop"
                title="Notifications"
                setHook={setIsEnabled}
                hook={isEnabled}
                colors={colors}
            />
            <View
                style={{
                    backgroundColor: "rgb(245, 245, 247)", // white-ish
                    width: "90%",
                    height: 50,
                    paddingHorizontal: 6,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopWidth: 0.2,
                    borderBottomStartRadius: 5,
                    borderBottomEndRadius: 5,
                    borderTopWidth: 0.2,
                    height: 50,
                }}
            >
                <Text style={{ color: "black", fontSize: 18 }}>
                    Select max of results
                </Text>
                <ModalSelector
                    touchableStyle={{
                        borderColor: "black",
                        borderWidth: 0,
                        borderRadius: 3,
                        color: "black",
                        fontSize: 18,
                        // backgroundColor: "red",
                    }}
                    data={data}
                    initValue={maxResults.toString()}
                    onChange={(option) => renderResult(option.key)}
                />
            </View>
            <Spacer />
            <MySwitch
                border="isTop"
                title="Switch Theme"
                setHook={setIsEnabled}
                hook={isEnabled}
                colors={colors}
            />
            <View
                style={{
                    backgroundColor: "rgb(245, 245, 247)", // white-ish
                    width: "90%",
                    height: 50,
                    paddingHorizontal: 6,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopWidth: 0.2,
                    borderBottomStartRadius: 5,
                    borderBottomEndRadius: 5,
                    borderTopWidth: 0.2,
                    height: 50,
                }}
            >
                <Text style={{ color: "black", fontSize: 18 }}>{"theme"}</Text>
            </View>

            <Spacer />
            <Spacer />
            <TouchableOpacity onPress={signOut}>
                <Text style={{ color: "red", fontSize: 20 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
