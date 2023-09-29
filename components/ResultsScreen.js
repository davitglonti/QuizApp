import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultsScreen = ({ route, navigation }) => {
  const { score } = route.params;

  const restartQuiz = () => {
    // Reset the score and navigate back to the HomeScreen
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Your Score: {score}</Text>
      <Button title="Restart Quiz" onPress={restartQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ResultsScreen;