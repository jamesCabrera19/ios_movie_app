import createDataContext from "./index/createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import movieAuth from "../api/auth";
//
const authReducer = (state, action) => {
    switch (action.type) {
        case "login":
            // true state {token, credits, userEmail} coming from API
            return {
                errorMessage: "",
                token: action.payload.token,
                email: action.payload.email,
                credits: action.payload.credits,
                userMovies: action.payload.movies,
            };
        case "logout":
            return { token: null, credits: 0, email: null, errorMessage: "" };
        case "add_error":
            return { ...state, errorMessage: "something went wrong" };
        case "remove_error":
            return { ...state, errorMessage: null };
        case "loading":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

const clearError = (dispatch) => () => dispatch({ type: "remove_error" });

const addCredits = (dispatch) => async (user) => {
    // authenticate password before making api request.
    try {
        dispatch({ type: "loading", payload: "loading" }); //! loader
        const res = await movieAuth.post("add-credits", user, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch({ type: "login", payload: res.data });
        dispatch({ type: "loading", payload: "done" }); //! loader
    } catch (error) {
        console.log("response: ", error);

        dispatch({ type: "add_error" });
    }
};

const removeCredits = (dispatch) => {
    async ({ amount, email, token }) => {
        try {
            const res = await movieAuth.post("/remove-credits", {
                credits: amount,
                email,
                token,
            });
            // dispatch the login function because the response sends back the user object with updated credits
            dispatch({ type: "login", payload: res.data });
        } catch (error) {
            dispatch({ type: "add_error" });
        }
    };
};

const signUp = (dispatch) => {
    return async ({ email, password }) => {
        try {
            dispatch({ type: "loading", payload: "loading" }); //! loader
            const res = await movieAuth.post("/signup", { email, password });
            await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
            await AsyncStorage.setItem("email", JSON.stringify(res.data.email));
            await AsyncStorage.setItem(
                "credits",
                JSON.stringify(res.data.credits)
            );
            dispatch({ type: "login", payload: res.data });
            dispatch({ type: "loading", payload: "done" }); //! loader
        } catch (error) {
            dispatch({ type: "add_error", payload: "Something went wrong" });
        }
    };
};
const signIn = (dispatch) => {
    return async ({ email, password }) => {
        try {
            dispatch({ type: "loading", payload: "loading" }); //! loader
            const res = await movieAuth.post("/signin", { email, password });
            await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
            await AsyncStorage.setItem("email", JSON.stringify(res.data.email));
            await AsyncStorage.setItem(
                "credits",
                JSON.stringify(res.data.credits)
            );
            dispatch({ type: "login", payload: res.data });
            dispatch({ type: "loading", payload: "done" }); //! loader
        } catch (error) {
            dispatch({ type: "add_error", payload: "Something went wrong" });
        }
    };
};

const autoSignin = (dispatch) => async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        const email = await AsyncStorage.getItem("email");
        const credits = await AsyncStorage.getItem("credits");

        if (token) {
            dispatch({
                type: "login",
                payload: {
                    token: JSON.parse(token),
                    email: JSON.parse(email),
                    credits: JSON.parse(credits),
                },
            });
        }
    } catch (error) {
        return;
    }
};

const signOut = (dispatch) => async () => {
    try {
        await AsyncStorage.removeItem("token");
        dispatch({ type: "logout" });
    } catch (e) {
        return;
    }
};

export const { Context, Provider } = createDataContext(
    authReducer,
    {
        signIn,
        signUp,
        clearError,
        signOut,
        addCredits,
        removeCredits,
        autoSignin,
    }, // action Functions
    {
        token: null,
        credits: 0,
        email: null,
        errorMessage: "",
        loading: "",
        userMovies: [],
    } // init STATE
);
