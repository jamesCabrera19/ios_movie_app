// system imports
import { useState, useCallback } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// my components
import MovieSearch from "../components/movieSearch";
import Spacer from "../components/spacer";
import Card from "../components/card";
// hooks
import useFetch from "../hooks/useFetch";

export default function SearchScreen({}) {
    // movies array is automatically populated with a default search of 'avengers'
    const [fetchMovie, movies, errorMessage, setErrorMessage] = useFetch();
    const [search, setSearch] = useState("");

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                setErrorMessage("");
            };
        }, [errorMessage])
    );

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-start", // y-axis
                alignItems: "center", // x-axis
            }}
        >
            <Spacer />
            <MovieSearch
                movieTerm={search}
                onTermChange={setSearch}
                onTermSubmit={() => {
                    fetchMovie(search);
                    setSearch("");
                }}
            />
            {errorMessage ? <Text> {errorMessage}</Text> : null}
            {/* this is a "memoized" component do not pass functions directly.
            it'll cause a re-render on every key stroke */}
            <Card state={movies} action="add" options />
        </View>
    );
}
