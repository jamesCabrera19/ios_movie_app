// system imports
import { useCallback, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Linking,
} from "react-native";
import {
    useFocusEffect,
    useIsFocused,
    useTheme,
} from "@react-navigation/native";
// context
import { Context as MovieDataContext } from "../context/dataContext";
// my components
import { ButtonHoc } from "../components/ButtonHoc";
import { RoundOpacity, ShareButton } from "../components/Buttons";
import Spacer from "../components/spacer";
import Results from "../components/results";
// hooks
import useFetch from "../hooks/useFetch";
import useVideo from "../hooks/useVideo";
//
import ytdl from "react-native-ytdl";

const setColor = (vote) => {
    let color;
    if (vote > 8) {
        color = "#00FF00";
    } else if (vote >= 8 || vote >= 7) {
        color = "orange";
    } else {
        color = "red";
    }
    return color;
};

export default function MovieResultScreen({ route, navigation }) {
    const { movie } = route.params;
    const { clearGenres } = useContext(MovieDataContext);
    const [fetchMovie, movies, errorMessage] = useFetch(true);
    const [setVideo, fetchVideo, video] = useVideo(); // video objects {}
    const isFocused = useIsFocused(); // dump large state <Results/> component - improves memory  issues
    const { colors } = useTheme();

    // fetch similar movies only when this screen is in focus
    useFocusEffect(
        useCallback(() => {
            // screen is in focus
            fetchMovie(null, movie.id);
            fetchVideo(movie.id);
            clearGenres(); // clearing Genre Fetched Movie Array
            return () => {
                // screen is in unfocus
                setVideo([]);
            };
        }, [movie])
    );

    //
    const parseVideoInfo = async () => {
        try {
            const [videoKey] = video.slice(0, 1);
            const youtubeURL = `https://www.youtube.com/watch?v=${videoKey.key}`;

            const urls = await ytdl(youtubeURL, {
                filter: (format) => format.container === "mp4",
            });
            const [link] = urls;

            return link;
        } catch (error) {
            return null;
        }
    };
    // * navigates user to secondary screen
    const playVideo = async () => {
        try {
            const res = await parseVideoInfo();
            navigation.navigate("NativeStack", {
                screen: "VideoScreen",
                params: {
                    movie: movie,
                    video: video,
                    link: res !== null ? res : null,
                },
            });
        } catch (error) {
            navigation.navigate("NativeStack", {
                screen: "VideoScreen",
                params: {
                    movie: movie,
                    video: video,
                    link: "This movie is not available",
                },
            });
            return;
        }
    };

    //! * opens link outside browser => canceled
    const getVideo = async () => {
        try {
            const res = await parseVideoInfo();
            Linking.openURL(res.url);
        } catch (error) {
            return null;
        }
    };

    return (
        <ScrollView style={[styles.container]}>
            <Image
                style={styles.img}
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                }}
            />
            {/* // * SECTION TITLE AND RELEASED DATE */}
            <Text
                style={[
                    styles.text,
                    {
                        fontWeight: colors.fontTitleWeight,
                        color: colors.fontColor,
                    },
                ]}
            >
                {movie.title}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Text
                    style={[
                        styles.text,
                        { color: colors.fontColor, paddingRight: 10 },
                    ]}
                >
                    Released {movie.release_date}, Rating
                </Text>
                <View style={styles.voteAverageBox}>
                    <Text
                        style={{
                            fontWeight: colors.fontTitleWeight,
                            color: setColor(movie.vote_average),
                        }}
                    >
                        {Math.round(movie.vote_average)}
                    </Text>
                </View>
            </View>

            {/* // * SECTION BUTTONS: { PLAY, DOWNLOAD } */}

            <RoundOpacity
                title="Play"
                action={playVideo}
                iconName="controller-play"
                size={20}
                color={colors.button}
            />
            {/* <RoundOpacity
                title="Download"
                action={getVideo}
                iconName="download"
                size={16}
                color={colors.button}
            /> */}

            {/* // * SECTION MOVIE OVERVIEW*/}
            <View style={styles.sectionFour}>
                <Text style={{ color: colors.fontColor }}>
                    {movie.overview}
                </Text>
            </View>

            {/* // * SECTION BUTTONS: { SHARE, LIST } */}
            <View style={styles.sectionFive}>
                <ButtonHoc action="add" movie={movie} color={colors.button} />
                <ShareButton movieObject={movie} color={colors.button} />
            </View>

            {/* // * SECTION  More Like This*/}
            <View style={styles.sectionSix}>
                <Text
                    style={{
                        color: colors.fontColor,
                        fontWeight: colors.fontTitleWeight,
                        paddingLeft: 10,
                    }}
                >
                    More Like This
                </Text>
            </View>

            {/* // * SECTION */}
            <Spacer>{isFocused ? <Results state={movies} /> : null}</Spacer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    text: { marginBottom: 10, paddingLeft: 10 },
    container: {
        flex: 1,
    },
    img: {
        height: 240,
        width: 390,
        marginBottom: 10,
    },
    voteAverageBox: {
        width: 20,
        height: 20,
        marginTop: -7,
        backgroundColor: "#676767",
        borderColor: "#676767",
        borderRadius: 4,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    sectionFour: {
        marginBottom: 10,
        padding: 10,
    },
    sectionFive: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    sectionSix: { marginBottom: 10 },
    actionBtn: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
});
