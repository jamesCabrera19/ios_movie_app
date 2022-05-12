// system imports
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
// data context
import { Context as MovieActionContext } from "../context/actionsContext";

// my components
import Card from "../components/card";
import InitMovieProp from "../components/initProp";

export default function MyMovies({ navigation }) {
    const { state } = useContext(MovieActionContext);
    const { colors } = useTheme();
    const [initProp, setInitProp] = useState(false);

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 35,
                flexDirection: "column",
                justifyContent: "flex-start", // y-axis
                alignItems: "center", // x-axis
            }}
        >
            <Text style={{ padding: 10, color: colors.fontColor }}>
                {state?.length}{" "}
                {state?.length !== 1 || state?.length === 0
                    ? "Movies"
                    : "Movie"}
            </Text>
            {/* {!initProp ? <InitMovieProp action={setInitProp} /> : null} */}

            <Card state={state} action="remove" />
        </View>
    );
}
