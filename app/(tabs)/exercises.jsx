import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Exercise() {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const router = useRouter();

    const exercises = [
        { 
            title: 'Exercise 3', 
            description: [
                'Create login screen', 
                'Login screen fields:', 
                '• Email', 
                '• Password'
            ],
            screen: '/login' 
        },
        { 
            title: 'Exercise 4', 
            description: [
                'Create a Stop Watch', 
                'Stop Watch Screen Fields:', 
                '• Start/Stop Button: Allows user to start and stop the timer', 
                '• Reset Button: Resets the timer', 
            ],
            screen: '/stopwatch' 
        },
        { 
            title: 'Exercise 5', 
            description: [
                'Create register screen', 
                'Register screen fields:', 
                '• Image: Allows user to select image', 
                '• Name', 
                '• Email', 
                '• Password'
            ], 
            screen: '/register'
        },
        { 
            title: 'Exercise 6', 
            description: [
                'Create a simple CRUD'
            ], 
            screen: '/crudapp ' 
        },
        { 
            title: 'Exercise 7', 
            description: [
                'Create a simple quiz using the API from Open Trivia Database.',
                'The user should be able to input the number of questions they want to answer,',
                'with a minimum of 10 and a maximum of 30. The UI will also be considered in grading',
                'this exercise. After completing the quiz,',
                'the users score should be displayed as score/total questions.',
            ], 
            screen: '/quizapp/quiz' 
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {exercises.map((exercise, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => setSelectedExercise(selectedExercise === index ? null : index)}
                    style={styles.card}
                >
                    <Text style={styles.title}>{exercise.title}</Text>
                    {selectedExercise === index && (
                        <View style={styles.content}>
                            {exercise.description.length > 0 ? (
                                exercise.description.map((item, i) => (
                                    <Text key={i} style={styles.text}>{item}</Text>
                                ))
                            ) : (
                                <Text style={styles.text}>No content available</Text>
                            )}
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => router.push(exercise.screen)} 
                            >
                                <Text style={styles.buttonText}>Go to </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#A7B6DD"
    },
    card: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
    },
    content: {
        marginTop: 10
    },
    text: {
        fontSize: 16,
        color: "#333333",
    },
    button: {
        marginTop: 10,
        backgroundColor: "#A7B6DD",
        padding: 10,
        borderRadius: 5,
        paddingVertical: 5,  
        paddingHorizontal: 20,
        alignItems: "center",
        alignSelf: "flex-start",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
});     