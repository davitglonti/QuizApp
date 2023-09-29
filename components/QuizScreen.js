import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

import axios from 'axios';

const QuizScreen = ({ route, navigation }) => {
  const { category, difficulty } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120); // 2 minutes game time

  useEffect(() => {
    // Fetch questions from the API based on category and difficulty
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: 10, // Number of questions
          category,
          difficulty,
        },
      })
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category, difficulty]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(timerInterval);
        // Time is up, navigate to the ResultsScreen
        navigation.navigate('Results', { score });
      }
    }, 1000); // Update timer every second

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, navigation, score]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to the next question or navigate to the ResultsScreen if all questions are answered
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      clearInterval(timer);
      navigation.navigate('Results', { score });
    }
  };

  const handleRestart = () => {
    // Reset the quiz by navigating to the Home screen
    navigation.navigate('Home');
  };

  const timerStyle = timer < 10 ? { color: 'red' } : {}; // Change timer color to red when timer is less than 10 seconds

  return (
    <View style={styles.container}>
      <View style={styles.questionIdContainer}>
        <Text style={styles.questionId}>Question {currentQuestionIndex + 1}</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{questions[currentQuestionIndex]?.question}</Text>
      </View>

      {/* Render the correct answer first */}
      <TouchableOpacity style={styles.answerlist} onPress={() => handleAnswer(true)}>
        <Text style={styles.answerWord}>{questions[currentQuestionIndex]?.correct_answer}</Text>
      </TouchableOpacity>

      {questions[currentQuestionIndex]?.incorrect_answers
        .slice()
        .reverse() // Reverse incorrect answers
        .map((item, i) => (
          <TouchableOpacity style={styles.answerlist} onPress={() => handleAnswer(false)} key={i}>
            <Text style={styles.answerWord}>{item}</Text>
          </TouchableOpacity>
        ))}

      <View style={styles.timerContainer}>
        <Text style={[styles.timerText, timerStyle]}>
          remaining time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
        </Text>
      </View>

      <Text style={styles.numberOfQuestionsText}>
        Number of questions: {questions.length}
      </Text>

      <View style={styles.restartButtonContainer}>
        <Button title="Restart" onPress={handleRestart} color="red"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  questionIdContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  questionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  questionContainer: {
    backgroundColor: '#A0A0A0',
    padding: 20,
    borderRadius: 100,
    marginTop: 50,
    marginBottom: 10,
  },
  questionText: {
    color: 'white', // Change the color to your desired color
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18, // Change the font size to your desired size
  },
  answerlist: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  answerWord: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  numberOfQuestionsText: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  restartButtonContainer: {
    position: 'absolute',
    bottom: 3,
    left: 15,
    backgroundColor: 'red'


  },
});

export default QuizScreen;