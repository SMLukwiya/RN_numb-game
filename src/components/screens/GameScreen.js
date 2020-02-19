import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../common/NumberContainer';
import Card from '../common/Card';
import PrimaryButton from '../common/PrimaryButton';
import BodyText from '../common/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItemStyle}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
)

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess) //userChoice is the number to exclude
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1); // an Object
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props; //destructuring makes sure useEffect run only after those three arguments have changed

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie', 'You know that this is not right!!', [{text: 'Sorry!', style: 'cancel'}]);
      return
    }

    if (direction === 'lower') {

      currentHigh.current = currentGuess; //set current high because that is the highest for that guess
      generateRandomBetween()
    } else {
      currentLow.current = currentGuess + 1; //ensure new lower boundary is excluded when generating a random number again
    }
    /* rerun the function with the new values and set state to nextNumber guessed */
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    //Using current guess wouldn't work because React won't have updated the state and rebuilt the component yet
    setPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses])

  }
  /* without () to provide pointer at our function so it executes when user presses onPress for the buttns below */
  return (
    <View style={styles.screenStyle}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainerStyle}>
        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </PrimaryButton>
        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </PrimaryButton>
      </Card>
      <View style={styles.listStyle}>
        <ScrollView contentContainerStyle={styles.listContentStyle}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  },
  listItemStyle: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  listStyle: {
    alignItems: 'center'
  },
  listContentStyle: {
    width: '80%',
    flex: 1
  }
})

export default GameScreen;
