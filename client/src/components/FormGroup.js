import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BaseTextInput from './BaseTextInput';
const FormGroup = props => {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.formLabel}>{props.label}</Text>
      <BaseTextInput
        {...props}
        autoCapitalize="none"
        style={styles.formInput}></BaseTextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    width: '75%',
  },
  formLabel: {
    marginBottom: 10,
    fontSize: 18,
    color: 'white',
  },
  formInput: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 20,
    padding: '2%',
    width: '100%',
  },
});

export default FormGroup;
