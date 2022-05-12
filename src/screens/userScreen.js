import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Linking } from "react-native";
import qs from "qs";
//
import { StyleSheet, Text, View, TextInput } from "react-native";
//
import Spacer from "../components/spacer";
import { RoundButton } from "../components/Buttons";
//
//
const sendEmail = async (to, subject, body, options = {}) => {
    const { cc, bcc } = options;
    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc,
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error("Provided URL can not be handled");
    }

    return Linking.openURL(url);
};

export default function UserScreen({ navigation }) {
    //
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    //
    const { colors } = useTheme();
    //

    const handleValidation = async () => {
        // validate form
        if (!email || !message) {
            setError("Please fill all input fields");
        }
        if (email && message) {
            // make post request
            await sendEmail(
                email,
                "Potential Employer",
                "Hi Jaime Cabrera, I am " + name,
                {
                    cc: "",
                }
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text
                style={[
                    styles.label,
                    { alignSelf: "center", color: colors.fontColor },
                ]}
            >
                Contact Me
            </Text>
            <Spacer />
            <Spacer />
            <Text style={[styles.label, { color: colors.fontColor }]}>
                Your Name
            </Text>
            <TextInput
                style={[styles.input, { color: colors.fontColor }]}
                value={name}
                placeholder="to James Cabrera"
                placeholderTextColor="grey"
                onChangeText={setName}
            />
            <Spacer />
            <Text style={[styles.label, { color: colors.fontColor }]}>
                Your Email
            </Text>
            <TextInput
                style={[styles.input, { color: colors.fontColor }]}
                value={email}
                placeholder="to jctcabrera@outlook.com"
                placeholderTextColor="grey"
                onChangeText={setEmail}
            />
            <Spacer />
            <Text style={[styles.label, { color: colors.fontColor }]}>
                Message to developer
            </Text>
            <TextInput
                style={[styles.input, { color: colors.fontColor, height: 80 }]}
                value={message}
                placeholder="message"
                placeholderTextColor="grey"
                onChangeText={setMessage}
            />
            <Spacer />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <RoundButton
                title="Send Message"
                color={colors.button}
                credits={1}
                action={handleValidation}
            />

            <Spacer />
            <Spacer />
            <Text
                style={[
                    styles.disclosure,
                    { alignSelf: "center", color: colors.fontColor },
                ]}
            >
                Disclosure
            </Text>
            <Text style={[styles.disclosure, { color: colors.fontColor }]}>
                This app is for public demonstration and potential employers
                only. Emails and passwords are not shared with anyone and are
                only visible to the developer. App created by James Cabrera
                2022.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    input: {
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        marginBottom: 15,
        marginHorizontal: 40,
        height: 30,
        width: "90%",
        paddingLeft: 10,
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginHorizontal: 40,
        alignSelf: "flex-start",
    },
    disclosure: {
        fontSize: 14,
        marginBottom: 5,
        marginHorizontal: 40,
    },
    error: {
        color: "red",
        fontWeight: "900",
        alignSelf: "center",
    },
});
