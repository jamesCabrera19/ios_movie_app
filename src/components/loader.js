import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function Loader({ navigation }) {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView
                source={require("../../assets/loader.json")}
                autoPlay
                loop
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.01)",
        zIndex: 10,
    },
});
