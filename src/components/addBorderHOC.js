import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

const AddBorder = ({ children }) => {
    const { colors } = useTheme();

    return (
        <View
            style={{
                height: 32,
                marginHorizontal: 10,
                paddingHorizontal: 15,
                borderColor: colors.button,
                borderWidth: 1,
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                justifyContent: "center",
            }}
        >
            {children}
        </View>
    );
};

export default AddBorder;
