import axios from "axios";
import keys from "../keys/keys";

export default axios.create({
    baseURL: `https://api.themoviedb.org/3/search/movie?&query=`,
    headers: {
        Authorization: `Bearer ${keys.movieDBtoken}`,
    },
});

//         search: `https://api.themoviedb.org/3/search/movie?&api_key=${API.KEY}&query=`,

// https://api.themoviedb.org/3/search/movie?api_key=1fa86633efa961a3d2faa3b36d6975c4&query=avengers
