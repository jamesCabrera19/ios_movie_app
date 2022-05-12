import {
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LatestMovie({ state }) {
    // * exports to home
    const navigation = useNavigation();
    //
    if (!state) {
        return <ActivityIndicator size="large" style={{ paddingTop: 40 }} />;
    } else {
        return (
            <View style={{ height: 400 }}>
                <TouchableOpacity
                    onPress={
                        () =>
                            navigation.navigate("ModalStack", {
                                screen: "MovieScreen",
                                params: { movie: state },
                            }) //! nested route
                    }
                >
                    <ImageBackground
                        resizeMode="cover"
                        style={{
                            height: Dimensions.get("screen").height,
                            width: Dimensions.get("screen").width,
                        }}
                        source={{
                            uri: `https://image.tmdb.org/t/p/original${state.poster_path}`,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

// https://api.themoviedb.org/3/guest_session/{guest_session_id}/rated/movies?api_key=<<api_key>>&language=en-US&sort_by=created_at.asc
