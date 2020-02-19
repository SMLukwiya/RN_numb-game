import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../common/BodyText';
import Colors from '../../constants/color';
import PrimaryButton from '../common/PrimaryButton';

const GameOverScreen = props => {
  return (
    <View style={styles.screenStyle}>
      <Text>Game over</Text>
      <View style={styles.imageContainerStyle}>
        <Image style={styles.imageStyle} resize="contain" source={require('../../../assets/images/win.jpg')} />
      </View>
      <View style={styles.resultContainerStyle}>
        <BodyText style={styles.resultTextStyle}>
          Your phone needed
          <Text style={styles.textHighlight}>{props.roundsNumber}</Text> rounds to guess the number
          <Text style={styles.textHighlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <PrimaryButton onPress={props.onRestart}>
        RESTART
      </PrimaryButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainerStyle: {
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'gray',
    width: '80%',
    height: 300,
    borderRadius: 50,
    overflow: 'hidden'
  },
  imageStyle: {
    width: '100%',
    height: '100%'
  },
  textHighlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
    marginHorizontal: 10
  },
  resultContainerStyle: {
    marginHorizontal: 20,
    marginVertical: 15
  },
  resultTextStyle: {
    textAlign: 'center',
    fontSize: 18
  }
})

export default GameOverScreen;
