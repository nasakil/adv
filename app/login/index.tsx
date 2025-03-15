import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        alert(`Logging in with ${email}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="white" // Keeps placeholder visible in dark mode
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="white"
                    style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={handleLogin} color="#1717e6" />
                    <View style={{ height: 10 }} /> 
                    <Button title="Back" onPress={() => router.back()} color="gray" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#48cae4",
        padding: 20,
    },
    innerContainer: {
        width: "100%",
        maxWidth: 350,
        padding: 20,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent effect
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "white",
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        marginBottom: 10,
        color: "white",
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Keeps input dark when focused
    },
    buttonContainer: {
        marginTop: 10,
    },
});

