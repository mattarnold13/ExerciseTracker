import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, SafeAreaView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import { getCalanderDate } from '../../util/getCalanderDate';

function ExerciseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  
  

  const [inputs, setInputs] = useState({
    time: {
      value: defaultValues ? defaultValues.time.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    exerciseType: {
      value: defaultValues ? defaultValues.exerciseType : '',
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const exerciseData = {
      time: +inputs.time.value,
      date: new Date(inputs.date.value),
      exerciseType: inputs.exerciseType.value,
    };

    const timeIsValid = !isNaN(exerciseData.time) && exerciseData.time > 0;
    const dateIsValid = exerciseData.date.toString() !== 'Invalid Date';
    const exerciseTypeIsValid = exerciseData.exerciseType.trim().length > 0;
   

    if (!timeIsValid || !dateIsValid || !exerciseTypeIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          time: { value: curInputs.time.value, isValid: timeIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          exerciseType: {
            value: curInputs.exerciseType.value,
            isValid: exerciseTypeIsValid,
          },
        };
      });
      return;
    }

    onSubmit(exerciseData);
  }
   
   
  const formIsInvalid =
    !inputs.time.isValid ||
    !inputs.date.isValid ||
    !inputs.exerciseType.isValid;

    return (
      <View style={styles.form}>
        <Text style={styles.title}>Your Exercise</Text>
        <View style={styles.inputsRow}>
          <Input
            style={styles.rowInput}
            label="Time"
            invalid={!inputs.time.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'time'),
              value: inputs.time.value,
            }}
          />
          <Input
            style={styles.rowInput}
            label="Date"
            invalid={!inputs.date.isValid}
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, 'date'),
              value: inputs.date.value,
            }}
          />
        </View>
        <Input
          label="Exercise Type"
          invalid={!inputs.exerciseType.isValid}
          textInputConfig={{
            multiline: true,
            // autoCapitalize: 'none'
            // autoCorrect: false // default is true
            onChangeText: inputChangedHandler.bind(this, 'exerciseType'),
            value: inputs.exerciseType.value,
          }}
        />
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data!
          </Text>
        )}
        <View style={styles.buttons}>
          <Button style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            {submitButtonLabel}
          </Button>
        </View>
      </View>
    );
  }
  
  export default ExerciseForm;
  
  const styles = StyleSheet.create({
    form: {
      marginTop: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginVertical: 24,
      textAlign: 'center',
    },
    inputsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowInput: {
      flex: 1,
    },
    errorText: {
      textAlign: 'center',
      color: GlobalStyles.colors.error500,
      margin: 8,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      minWidth: 120,
      marginHorizontal: 8,
    },
  });
