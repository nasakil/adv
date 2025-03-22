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
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
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
      setIsQuizCompleted(false);
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
    } else {
      setIsQuizCompleted(true);
      setIsQuizStarted(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!isQuizStarted && !isQuizCompleted ? (
        <View style={styles.startContainer}>
          <Text style={styles.title}>Enter Number of Questions (10-30):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numQuestions}
            onChangeText={setNumQuestions}
            placeholder="Enter a number"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.startButton} onPress={fetchQuestions}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : isQuizCompleted ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>🎉 Quiz Completed!</Text>
          <Text style={styles.resultScore}>Your score: {score}/{questions.length}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => setIsQuizCompleted(false)}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.progressText}>Question {currentQuestionIndex + 1} / {questions.length}</Text>
          <Text style={styles.questionText}>{he.decode(questions[currentQuestionIndex].question)}</Text>
          {questions[currentQuestionIndex].incorrect_answers
            .concat(questions[currentQuestionIndex].correct_answer)
            .sort(() => Math.random() - 0.5)
            .map((answer, index) => (
              <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswer(answer)}>
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
    backgroundColor: "#E8F0FE",
  },
  startContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    width: "80%",
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  quizContainer: {
    alignItems: "center",
  },
  progressText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  answerButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  answerText: {
    color: "white",
    fontSize: 18,
  },
  scoreText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  resultScore: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007BFF",
  },
  retryButton: {
    backgroundColor: "#DC3545",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
  },
});
