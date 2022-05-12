import axios from "axios";
import keys from "../keys/keys";

export default axios.create({
    baseURL: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${keys.movieDBkey}`,
});
