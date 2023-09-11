import { View, Text, StyleSheet } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

function ExercisesSummary({ exercises, periodName }) {
  const exercisesSum = exercises.reduce((sum, exercise) => {
    return sum + exercise.amount;
  }, 0);

  //let time = exercisesSum;
  var totaltime = (Math.floor(exercisesSum / 60) + ':' + exercisesSum % 60);
  //var minutes = time % 60;
  //var totaltime = hours + minutes;

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
     {/*  <Text style={styles.sum}>{(exercisesSum.toFixed(2) / 60)}</Text> */}
      <Text style={styles.sum}>{(totaltime)}</Text>
    </View>
  );
}

export default ExercisesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});