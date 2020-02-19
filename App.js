import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './src/components/common/Header';
import StartScreen from './src/components/screens/StartGameScreen';
import GameScreen from './src/components/screens/GameScreen';
import GameOverScreen from './src/components/screens/GameOverScreen';

// Configure your fonts to be used
const fetchFonts = () => {
  // Tell the app which fonts to load
  return Font.loadAsync({ //return since it returns a promise
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [appDataloaded, setAppDataLoaded] = useState();
  const [userNumber, setUserNumber] = useState();//userNumber is undefined currently
  const [guessRounds, setGuessRounds] = useState(0);//initial number of guesses

  if(!appDataloaded){
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setAppDataLoaded(true)}
        onError={err => console.log(err)} />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds)
  }

  const restartGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  let content = <StartScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  } else if (guessRounds > 0) {
    content = <GameOverScreen
                  roundsNumber={guessRounds}
                  userNumber={userNumber}
                  onRestart={restartGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title = 'Guess a Number' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
