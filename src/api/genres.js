import axios from "axios";
import keys from "../keys/keys";

export default axios.create({
    baseURL: `https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1`,
    headers: {
        Authorization: `Bearer ${keys.movieDBtoken}`,
    },
});
// https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
