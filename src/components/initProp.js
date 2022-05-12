// system imports
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
// my components
import { ShareButton } from "./Buttons";

export default function InitMovieProp({ action }) {
    const navigation = useNavigation();
    const { colors } = useTheme();

    const movie = {
        adult: false,
        backdrop_path: "/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg",
        genre_ids: [28, 12, 14, 878],
        id: 791373,
        original_language: "en",
        original_title: "Zack Snyder's Justice League",
        overview:
            "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
        popularity: 378.693,
        poster_path: "/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg",
        release_date: "2021-03-18",
        title: "Zack Snyder's Justice League",
        video: false,
        vote_average: 8.3,
        vote_count: 7243,
    };

    return (
        <View style={{ height: 350, width: 370, overflow: "hidden" }}>
            <TouchableOpacity
                onPress={() => {
                    /* nested route */
                    navigation.navigate("ModalStack", {
                        screen: "MovieScreen",
                        params: { movie: movie },
                    });
                }}
            >
                {movie.backdrop_path ? (
                    <Image
                        style={{
                            height: "80%",
                            width: "100%",
                            borderRadius: 10,
                        }}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                        }}
                    />
                ) : (
                    <Image
                        style={{
                            height: "80%",
                            width: "100%",
                            borderRadius: 10,
                        }}
                        source={require("../imgs/not_found.jpg")}
                    />
                )}
            </TouchableOpacity>

            <View
                style={{
                    height: "20%",
                    width: "100%",
                    marginTop: -30,
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                <View
                    style={{
                        height: "50%",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center", // x-axis
                        paddingHorizontal: 10,
                        flexWrap: "wrap",
                    }}
                >
                    <Text
                        style={{
                            color: colors.fontColor,
                            fontWeight: colors.fontTitleWeight,
                            fontSize: 20,
                        }}
                    >
                        {movie.title.slice(0, 13)}
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => action((prev) => !prev)}
                        >
                            <Feather
                                name="trash"
                                size={22}
                                color={colors.button}
                                style={{ marginRight: 30 }}
                            />
                        </TouchableOpacity>
                        <ShareButton
                            movieObject={movie}
                            color={colors.button}
                        />
                    </View>
                </View>

                <View
                    style={{
                        width: "100%",
                        alignItems: "center", // x-axis
                        paddingTop: 10,
                    }}
                >
                    <Text style={{ color: colors.fontColor }}>
                        {movie.overview.slice(0, 105)} ...
                    </Text>
                </View>
            </View>
        </View>
    );
}
