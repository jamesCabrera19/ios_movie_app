import { useState } from "react";
import { StyleSheet, Button, TextInput, Text, View } from "react-native";
import Spacer from "./spacer";

function AuthForm({ headerText, errorMessage, onSubmit, btnText }) {
    const [email, setEmail] = useState("xplayalimbox92@hotmail.com");
    const [password, setPassword] = useState("password");

    const styles = StyleSheet.create({
        text: { fontSize: 25, color: "white" },
        input: {
            fontSize: 18,
            width: 340,
            height: 30,
            borderWidth: 1,
            color: "white",
            borderRadius: 5,
        },
        btn: {
            borderWidth: 1,
            backgroundColor: "red",
        },
        err: {
            color: "red",
        },
    });

    return (
        <>
            <Text style={styles.text}>{headerText}</Text>
            <Spacer />
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Spacer />
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                placeholder="password"
                value={password}
                onChangeText={setPassword}
            />
            <Spacer />
            {errorMessage ? (
                <Text style={styles.err}>{errorMessage}</Text>
            ) : null}

            <Button
                color="blue"
                title={btnText}
                onPress={() => onSubmit({ email, password })}
                disabled={!email.length || !password.length ? true : false}
            />
            <Spacer />
        </>
    );
}

export default AuthForm;
