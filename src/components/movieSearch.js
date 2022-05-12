// system imports
import { TextInput, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

//
export default function MovieSearch({ movieTerm, onTermChange, onTermSubmit }) {
    // * exports to search
    return (
        <View style={styles.background}>
            <Feather name="search" style={styles.icon} />
            <TextInput
                placeholder="search movies"
                autoCorrect={false}
                value={movieTerm}
                style={styles.input}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        marginVertical: 10,
        backgroundColor: "#3f424d",
        height: 30,
        width: 340,
        borderRadius: 5,
        marginHorizontal: 5,
        flexDirection: "row",
    },
    input: {
        fontSize: 18,
        width: 340,
    },
    icon: {
        fontSize: 18,
        alignSelf: "center",
        marginHorizontal: 15,
    },
});
