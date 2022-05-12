import { StyleSheet, View } from "react-native";

export default function Spacer({ children, options }) {
    const styles = StyleSheet.create({
        container: { margin: 15 },
        options: {
            marginLeft: 15,
            marginTop: 0,
            marginBottom: 0,
            marginRight: 0,
        },
    });
    return (
        <View style={options ? styles.options : styles.container}>
            {children}
        </View>
    );
}
