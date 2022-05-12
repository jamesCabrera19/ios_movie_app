import { Dimensions, View, ImageBackground } from "react-native";
// import Youtube from "../components/youtube";
import Video from "../components/video";
import { useTheme } from "@react-navigation/native";
import NotFoundVideo from "../components/NotFoundVideo";
import { AntDesign } from "@expo/vector-icons";
import { ButtonHoc } from "../components/ButtonHoc";
import { ShareButton, DownloadWallpaper } from "../components/Buttons";
import AddBorder from "../components/addBorderHOC";

//
export default function VideoScreen({ route }) {
    const { video, movie, link } = route.params;
    // const [firstVideo] = video.slice(0, 1);
    const { colors } = useTheme();

    return (
        <>
            <ImageBackground
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: "100%",
                }}
                source={{
                    uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                }}
            >
                {link ? (
                    <View
                        style={{
                            marginTop:
                                Dimensions.get("window").height / 2 - 100,
                        }}
                    >
                        <Video link={link} />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 60,
                                borderWidth: 10,
                                borderColor: colors.background,
                                marginTop:
                                    Dimensions.get("window").height / 3.2,
                                backgroundColor: colors.background,
                            }}
                        >
                            {/* <AddBorder>
                                <AntDesign
                                    name="hearto"
                                    size={30}
                                    color={colors.button}
                                />
                            </AddBorder> */}

                            <AddBorder>
                                <ButtonHoc
                                    action="add"
                                    movie={movie}
                                    color={colors.button}
                                />
                            </AddBorder>
                            <AddBorder>
                                <ShareButton
                                    movieObject={movie}
                                    color={colors.button}
                                />
                            </AddBorder>
                            <AddBorder>
                                <DownloadWallpaper
                                    poster_path={movie.poster_path}
                                    color={colors.button}
                                    size={23}
                                />
                            </AddBorder>
                        </View>
                    </View>
                ) : (
                    <NotFoundVideo poster_path={movie.poster_path} />
                )}
            </ImageBackground>
        </>
    );
}
