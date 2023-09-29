import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [categories, setCategories] = useState([]);
 
  useEffect(() => {
    // Fetch categories from the API
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  const startQuiz = () => {
   
    navigation.navigate('Quiz', { category, difficulty });
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSelectedCategory(newCategory);
    setSelectedDifficulty(null); // Reset the selected difficulty
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setSelectedDifficulty(newDifficulty);
    setSelectedCategory(null); // Reset the selected category
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Category:</Text>
      {/* Replace the Picker with buttons or other input methods */}
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.button,
              selectedCategory === cat.id && styles.selectedButton,
            ]}
            onPress={() => handleCategoryChange(cat.id)}
          >
            <Text >{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Select Difficulty:</Text>
      {/* Replace the Picker with buttons or other input methods */}
      <View style={styles.difficultyContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedDifficulty === 'easy' && styles.selectedButton,
          ]}
          onPress={() => handleDifficultyChange('easy')}
        >
          <Text>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedDifficulty === 'medium' && styles.selectedButton,
          ]}
          onPress={() => handleDifficultyChange('medium')}
        >
          <Text>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedDifficulty === 'hard' && styles.selectedButton,
          ]}
          onPress={() => handleDifficultyChange('hard')}
        >
          <Text >Hard</Text>
        </TouchableOpacity>
      </View>

      <Button title="Start Quiz" onPress={startQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    
  },
  difficultyContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: 'green', // Change  background color for the selected element
  },
 
});

export default HomeScreen;
