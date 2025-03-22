import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import he from "he"; 

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function QuizApp() {
  const [numQuestions, setNumQuestions] = useState<string>("10");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const router = useRouter();

  const fetchQuestions = async () => {
    const amount = parseInt(numQuestions);
    if (amount < 10 || amount > 30) {
      Alert.alert("Error", "Please enter a number between 10 and 30");
      return;
    }

    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
      const data = await response.json();
      setQuestions(data.results);
      setIsQuizStarted(true);
      setCurrentQuestionIndex(0);
      setScore(0);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch questions");
    }
  };

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      Alert.alert("Quiz Completed", `Your score: ${score + 1}/${questions.length}`);
      setIsQuizStarted(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!isQuizStarted ? (
        <View style={styles.startContainer}>
          <Text style={styles.title}>Enter Number of Questions (10-30):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numQuestions}
            onChangeText={setNumQuestions}
          />
          <Button title="Start Quiz" onPress={fetchQuestions} />
        </View>
      ) : (
        <View style={styles.quizContainer}>
          {/* Fix for question text */}
          <Text style={styles.questionText}>{he.decode(questions[currentQuestionIndex].question)}</Text>

          {/* Fix for answer choices */}
          {questions[currentQuestionIndex].incorrect_answers
            .concat(questions[currentQuestionIndex].correct_answer)
            .sort(() => Math.random() - 0.5)
            .map((answer, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.answerButton} 
                onPress={() => handleAnswer(answer)}
              >
                <Text style={styles.answerText}>{he.decode(answer)}</Text>
              </TouchableOpacity>
            ))}
          
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  startContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    width: "80%",
    marginBottom: 20,
    borderRadius: 5,
  },
  quizContainer: {
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  answerButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  answerText: {
    color: "white",
    fontSize: 16,
  },
  scoreText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
});
