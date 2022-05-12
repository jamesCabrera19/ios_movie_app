import { useState, useEffect } from "react";
import movieSearch from "../api/search";
import axios from "axios";
//
export default (getSimilar) => {
    // * getSimilar:Boolean
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchMovie = async (text, movieID) => {
        try {
            let res;
            if (getSimilar) {
                res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=1fa86633efa961a3d2faa3b36d6975c4&language=en-US&page=1`
                );
                setMovies(res.data.results);
            } else {
                res = await movieSearch.get(text);
                setMovies(res.data.results);
            }
        } catch (error) {
            setErrorMessage("Something went wrong with useFetch");
        }
    };
    useEffect(() => {
        fetchMovie("Avengers");
    }, []);

    return [fetchMovie, movies, errorMessage, setErrorMessage];
};
