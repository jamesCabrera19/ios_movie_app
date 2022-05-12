// system imports
import { useContext, useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
// data context
import { Context as MovieActionContext } from "../context/actionsContext";
import { Context as MovieAuthContext } from "../context/authContext";

export function ButtonHoc({ action, movie, addMargin, color }) {
    // * exported to Card, MovieResult
    const { state, addToList, removeFromList } = useContext(MovieActionContext);
    const {
        state: { email },
    } = useContext(MovieAuthContext);

    const [btn, setBtn] = useState({ add: true, remove: false });
    const [track, setTrack] = useState(null); // => movie in db tracker

    useEffect(() => {
        // Do something when the screen is focused
        let isActive = true;

        const trackStateChange = async (movieID) => {
            if (isActive) {
                try {
                    // returns value of the first element that matches the condition
                    const match = await state.find(
                        (item) => item.id === movieID
                    );
                    setTrack(match.id);
                } catch (error) {
                    return null;
                }
            }
        };
        trackStateChange(movie.id);
        return () => {
            // Do something when the screen is unfocused
            setTrack(null);
            // resetting button state
            // this is necessary to avoid displaying the "trash" icon every time the movie changes
            // this was a bug caused by calling setBtn() onClick.
            setBtn({ add: true, remove: false });
            isActive = false;
        };
    }, [movie, state]);

    return (
        <>
            {btn.add ? (
                <TouchableOpacity
                    onPress={() => {
                        addToList(movie, email);
                        setBtn((prev) => ({
                            add: !prev.add,
                            remove: !prev.remove,
                        })); // switching state of buttons
                    }}
                >
                    <Feather
                        name={track !== null ? "check" : "plus"}
                        color={color}
                        size={30}
                        style={addMargin ? { marginRight: 30 } : null} // needed for card element
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        removeFromList(movie.id, movie, email);
                        setBtn((prev) => ({
                            add: !prev.add,
                            remove: !prev.remove,
                        })); // switching state of buttons
                    }}
                >
                    <Feather
                        name="trash"
                        size={22}
                        color={color}
                        style={{ marginRight: 30 }}
                    />
                </TouchableOpacity>
            )}
        </>
    );
}
