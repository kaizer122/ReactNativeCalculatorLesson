import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const Button = ({text, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.5}
      onPress={() => onPress(text)}>
      <Text
        style={
          ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(text)
            ? styles.normalText
            : styles.actionText
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: '25%',
    borderWidth: 0.5,
    borderColor: 'rgba(80,80,80,0.5)',
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'rgba(80,80,80,0.1)',
  },
  actionText: {
    color: 'blue',
    fontSize: 22,
  },
  normalText: {
    fontSize: 18,
  },
});
export default Button;
