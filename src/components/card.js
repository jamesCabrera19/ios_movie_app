// system imports
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
// my components
import { ButtonHoc } from "./ButtonHoc";
import { ShareButton } from "../components/Buttons";

//
const Card = React.memo(({ state, action, itemsToRender }) => {
    // * exports to myMovies, search
    const { colors } = useTheme();
    const navigation = useNavigation();

    const titleReducer = (title, options) => {
        // * return shorter version of input string
        if (title === undefined) return;
        let limit = 90; // default
        if (options) limit = options;
        const newTitle = [];

        if (title.length > limit) {
            title.split(" ").reduce((acc, cur) => {
                if (acc + cur.length <= limit) {
                    newTitle.push(cur);
                }
                return acc + cur.length;
            }, 0);
            return `${newTitle.join(" ")} ...`;
        }
        return title;
    };
    console.log("card rendering");

    return (
        <>
            <FlatList
                removeClippedSubviews={true}
                maxToRenderPerBatch={3}
                initialNumToRender={3}
                data={state.slice(0, 7)} // minimize List
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card}>
                            <TouchableOpacity
                                onPress={() => {
                                    // console.log(item);
                                    /* nested route */
                                    navigation.navigate("ModalStack", {
                                        screen: "MovieScreen",
                                        params: { movie: item },
                                    });
                                }}
                            >
                                {item.backdrop_path ? (
                                    <Image
                                        style={styles.image}
                                        source={{
                                            uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                                        }}
                                    />
                                ) : (
                                    <Image
                                        style={styles.image}
                                        source={require("../imgs/not_found.jpg")}
                                    />
                                )}
                            </TouchableOpacity>

                            <View style={styles.titleContainer}>
                                <View style={[styles.title]}>
                                    <Text
                                        style={{
                                            color: colors.fontColor,
                                            fontWeight: colors.fontTitleWeight,
                                            fontSize: 20,
                                        }}
                                    >
                                        {titleReducer(item.title, 11)}
                                    </Text>

                                    <View style={styles.touchables}>
                                        <ButtonHoc
                                            action={action} // add to list || delete from list
                                            movie={item}
                                            addMargin={true}
                                            color={colors.button}
                                        />
                                        <ShareButton
                                            movieObject={item}
                                            color={colors.button}
                                        />
                                    </View>
                                </View>

                                <View style={styles.overview}>
                                    <Text style={{ color: colors.fontColor }}>
                                        {titleReducer(item.overview)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </>
    );
});

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start", // y-axis
        alignItems: "center", // x-axis
    },
    card: {
        height: 350,
        width: 370,
        overflow: "hidden",

        // borderWidth: 2,
        // borderColor: "red",
    },
    image: {
        height: "80%",
        width: "100%",
        borderRadius: 10,
    },
    titleContainer: {
        height: "20%",
        width: "100%",
        marginTop: -30,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    title: {
        height: "50%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", // x-axis
        paddingHorizontal: 10,
        flexWrap: "wrap",
    },
    touchables: {
        flexDirection: "row",
        alignItems: "center",
    },
    overview: {
        width: "100%",
        alignItems: "center", // x-axis
        paddingTop: 10,
    },
});
export default Card;
