import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity
 } from 'react-native';

 import Colors from '../../constants/color';

 const PrimaryButton = props => (
   <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
     <View style={styles.buttonStyle}>
       <Text style={styles.buttonTextStyle}>{props.children}</Text>
     </View>
   </TouchableOpacity>
 );

 const styles = StyleSheet.create({
   buttonStyle: {
     backgroundColor: Colors.primary,
     paddingVertical: 12,
     paddingHorizontal: 30,
     borderRadius: 20
   },
   buttonTextStyle: {
     color: 'white',
     fontFamily: 'open-sans',
     fontSize: 14
   }
 });

 export default PrimaryButton;
