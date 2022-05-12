// system imports
import { useContext, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
// data context
import { Context as ActionsContext } from "../context/actionsContext";

export function TouchableAction({ action, movie }) {
    // * exported to Card, MovieResult
    // Actions can either be "add" or "remove"
    const { addToList, removeFromList, state } = useContext(ActionsContext);
    const [track, setTrack] = useState(null); // movie.id Number

    useEffect(() => {
        // Do something when the screen is focused
        let isActive = true;
        // console.log("UseEffect running");
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
            isActive = false;
        };
    }, [state, movie]);

    const renderContent = () => {
        switch (action) {
            case "add":
                return (
                    <TouchableOpacity onPress={() => addToList(movie)}>
                        <Feather
                            name={track ? "check" : "plus"}
                            color={track ? "green" : "white"}
                            size={30}
                            style={{ marginRight: 20 }}
                        />
                    </TouchableOpacity>
                );

            default:
                // ! delete
                return (
                    <TouchableOpacity onPress={() => removeFromList(movie.id)}>
                        <Feather
                            name="trash"
                            size={20}
                            color="white"
                            style={{ marginRight: 30 }}
                        />
                    </TouchableOpacity>
                );
        }
    };
    return renderContent();
}
