import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";

const defaultProfileImage = "https://img.icons8.com/pastel-glyph/50/FFFFFF/user-male-circle.png"; 

export default function RegisterScreen() {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleRegister = () => {
        alert(`Registering ${name} with email ${email}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Register</Text>
                
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Image source={{ uri: image || defaultProfileImage }} style={styles.profileImage} />
                </TouchableOpacity>

                <TextInput
                    placeholder="Name"
                    placeholderTextColor="white"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="white"
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
                    <Button title="Register" onPress={handleRegister} color="#1717e6" />
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
    buttonContainer: {
        marginTop: 10,
    },
    imagePicker: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
    },
});
