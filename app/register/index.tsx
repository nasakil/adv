import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebaseConfig"; 
import * as uuid from 'uuid'; 

const defaultProfileImage = "https://img.icons8.com/pastel-glyph/50/FFFFFF/user-male-circle.png";

export default function RegisterScreen() {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

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

    const onSubmit = async (data: any) => {
    try {
        
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        let photoURL = null;

        if (image) {
            const response = await fetch(image);
            const blob = await response.blob();

            const imageRef = ref(storage, `profileImages/${user.uid}-${uuid.v4()}`);
            await uploadBytes(imageRef, blob);

            photoURL = await getDownloadURL(imageRef);
        }

        await updateProfile(user, {
            displayName: data.name,
            photoURL: photoURL || undefined,
        });

        alert("Registration successful!");
        router.replace("/login"); 

    } catch (error: any) {
        console.error("Registration error:", error);
        alert("Error: " + error.message);
    }
};

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Register</Text>

                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Image source={{ uri: image || defaultProfileImage }} style={styles.profileImage} />
                </TouchableOpacity>

                {/* Name */}
                <Text>Name</Text>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor="white"
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.name && <Text style={styles.error}>{String(errors.name.message)}</Text>}

                {/* Email */}
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
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.email && <Text style={styles.error}>{String(errors.email.message)}</Text>}

                {/* Password */}
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
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.password && <Text style={styles.error}>{String(errors.password.message)}</Text>}

                <View style={styles.buttonContainer}>
                    <Button title="Register" onPress={handleSubmit(onSubmit)} color="#1717e6" />
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
