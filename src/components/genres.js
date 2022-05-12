// system imports
import React, { useContext } from "react";
// context
import { Context as MovieDataContext } from "../context/dataContext";
import { TouchableOpacity, Image, View, Text, FlatList } from "react-native";

import { images } from "./images";
//
function MovieGenres(props) {
    const { fetchMoviesByGenre } = useContext(MovieDataContext);

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={props.state}
            horizontal
            renderItem={({ item }) => {
                let _image = item.name.toLowerCase();
                if (_image === "science fiction") {
                    _image = "scifi";
                } else if (_image === "tv movie") {
                    _image = "tvmovie";
                }
                return (
                    <TouchableOpacity
                        onPress={() => fetchMoviesByGenre(item.id)}
                    >
                        <Image
                            style={{
                                marginHorizontal: 10,
                                height: 100,
                                width: 100,
                                borderRadius: 10,
                            }}
                            source={images.genres[_image]}
                        />
                    </TouchableOpacity>
                );
            }}
        />
    );
}
export default React.memo(MovieGenres);
