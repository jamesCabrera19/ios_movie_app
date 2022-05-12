// system imports
import React, { useContext } from "react";
import { FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context as MovieDataContext } from "../context/dataContext";

const Results = React.memo(({ state }) => {
    // * exported to Home, MovieResults
    const navigation = useNavigation();
    const {
        state: { maxResults },
    } = useContext(MovieDataContext); // limiting the number of results to be displayed

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={3}
            initialNumToRender={3}
            horizontal
            keyExtractor={(item) => item.id}
            data={state.slice(0, maxResults)}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("ModalStack", {
                            screen: "MovieScreen",
                            params: { movie: item },
                        });
                    }}
                >
                    <Image
                        style={{
                            marginHorizontal: 10,
                            height: 200,
                            width: 150,
                            borderRadius: 10,
                        }}
                        source={{
                            uri:
                                "https://image.tmdb.org/t/p/w500" +
                                item.poster_path,
                        }}
                    />
                </TouchableOpacity>
            )}
        />
    );
});

export default Results;
