import ModalSelector from "react-native-modal-selector";
import { View } from "react-native";

export default function CustomSelector({ selectedNumber, credits, color }) {
    // https://github.com/peacechen/react-native-modal-selector
    let index = 0;
    const data = [
        {
            key: index++,
            section: true,
            label: "Select Credits",
        },
        { key: index++, label: "1 Credit" },
        { key: (index = 3), label: "3 Credits" },
        { key: (index = 5), label: "5 Credits" },
        { key: (index = 7), label: "7 Credits" },
        { key: (index = 9), label: "9 Credits" },

        // etc...
        // Can also add additional custom keys which are passed to the onChange callback
        // { key: index++, label: "Input", customKey: "Not a fruit" },
    ];

    return (
        <View style={{ justifyContent: "space-around" }}>
            {/* // Default mode  */}
            <ModalSelector
                touchableStyle={{
                    borderColor: color,
                    borderWidth: 2,
                    borderRadius: 8,
                    // backgroundColor: "red",
                }}
                data={data}
                initValue={credits ? credits + " Credits" : "Select Credits"}
                onChange={(option) => {
                    // alert(`${option.label} (${option.key}) nom nom nom`);
                    selectedNumber(option.key);
                    // console.log(option.label);
                }}
            />
        </View>
    );
}
