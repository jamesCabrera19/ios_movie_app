// system imports
import { useContext, useState, useCallback } from "react";
import { Text, ActivityIndicator, ScrollView, View } from "react-native";
import {
    useFocusEffect,
    useIsFocused,
    useTheme,
} from "@react-navigation/native";
// data context
import { Context as MovieDataContext } from "../context/dataContext";

// components
import LatestMovie from "../components/latestMovie";
import Results from "../components/results";
import MovieGenres from "../components/genres";
import Spacer from "../components/spacer";
//
export default function HomeScreen({}) {
    const { state } = useContext(MovieDataContext);
    const isFocused = useIsFocused(); // dumps large <Results/> component - improves memory  issues
    const { colors } = useTheme();
    const [trending, setTrending] = useState({});

    //
    const trendingMovie = (stateArray) => {
        const getRandomInt = (maxInt) => Math.floor(Math.random() * maxInt);
        return stateArray[getRandomInt(9)];
    };

    // ?? the problem with this approach is that it only runs once
    useFocusEffect(
        useCallback(() => {
            // screen is in focus
            const trendingMovie = (stateArray) => {
                const getRandomInt = (maxInt) =>
                    Math.floor(Math.random() * maxInt);
                setTrending(stateArray[getRandomInt(9)]);
            };
            trendingMovie(state.main);

            return () => {
                // screen is in unfocus
            };
        }, [state.main])
    );

    const styles = {
        fontWeight: colors.fontTitleWeight,
        color: colors.fontColor,
    };

    if (!state) {
        return <ActivityIndicator size="large" style={{ paddingTop: 50 }} />;
    } else {
        return (
            <ScrollView style={{ backgroundColor: colors.background }}>
                {isFocused ? (
                    <>
                        <LatestMovie state={trending} />
                        <View style={{ marginTop: -100 }}>
                            <Spacer>
                                <Text style={styles}>Popular</Text>
                            </Spacer>
                            <Results state={state.main} />
                            <Spacer>
                                <Text style={styles}> Upcoming</Text>
                            </Spacer>
                            <MovieGenres state={state.genres} />
                            {state.moviesByGenre ? (
                                <>
                                    <Spacer />
                                    <Results state={state.moviesByGenre} />
                                </>
                            ) : null}
                        </View>
                    </>
                ) : null}
            </ScrollView>
        );
    }
}
