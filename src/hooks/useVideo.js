import { useState, useEffect } from "react";
import axios from "axios";
//
export default () => {
    const [video, setVideo] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchVideo = async (movieID) => {
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=1fa86633efa961a3d2faa3b36d6975c4&language=en-US`
            );
            setVideo(res.data.results);
        } catch (error) {
            setErrorMessage("Something went wrong");
        }
    };
    useEffect(() => {
        fetchVideo(null); // default returns error // undefined key
    }, []);

    return [setVideo, fetchVideo, video, errorMessage, setErrorMessage];
};
