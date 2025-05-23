import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoginScreen() {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        alert(`Welcome back, ${user.displayName || "user"}!`);
        router.replace("/"); // or navigate to your app's main screen
    } catch (error: any) {
        console.error("Login error:", error);
        alert("Login failed: " + error.message);
    }
};

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Login</Text>

                <Text>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="white"
                            style={styles.input}
                            keyboardType="email-address"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.error}>{String(errors.email.message)}</Text>}

                <Text>Password</Text>
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="white"
                            style={styles.input}
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.password && <Text style={styles.error}>{String(errors.password.message)}</Text>}

                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={handleSubmit(onSubmit)} color="#1717e6" />
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
        backgroundColor: "rgba(255, 255, 255, 0.1)",
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
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    error: {
        color: "#f01e2c",
        marginBottom: 10,
        fontSize: 14,
    },
    buttonContainer: {
        marginTop: 10,
    },
});