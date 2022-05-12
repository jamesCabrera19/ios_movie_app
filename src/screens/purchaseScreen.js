// system imports
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
// components
import Spacer from "../components/spacer";
import { RoundButton } from "../components/Buttons";

//
export default function PurchaseScreen({ navigation, route }) {
    const { colors } = useTheme();
    const { credits } = route.params;

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <AntDesign color={colors.button} name="checkcircleo" size={100} />
            <Spacer />
            <Spacer />
            <Text
                style={{
                    fontWeight: colors.fontTitleWeight,
                    color: colors.fontColor,
                    fontSize: 18,
                }}
            >
                Thank you for your Purchase!
            </Text>
            <Spacer />

            <Text
                style={{
                    // fontWeight: colors.fontTitleWeight,
                    color: colors.fontColor,
                    fontSize: 16,
                    paddingHorizontal: 20,
                }}
            >
                Your order was successfully processed! We've added{" "}
                <Text
                    style={{
                        color: colors.fontColor,
                        fontWeight: colors.fontTitleWeight,
                    }}
                >
                    {credits}
                </Text>{" "}
                credits to your account and sent you and email with all the
                details of your order.
            </Text>
            <Spacer />
            <RoundButton
                color={colors.button}
                title={"Continue Watching"}
                credits={1}
                action={() => navigation.pop()}
            />
        </View>
    );
}
