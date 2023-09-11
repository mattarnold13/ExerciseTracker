import { View, StyleSheet, Text } from "react-native";

import ExercisesList from "./ExercisesList";
import ExercisesSummary from "./ExercisesSummary";
import { GlobalStyles } from "../../constants/styles";



function ExercisesOutput({ exercises, exercisesPeriod, fallbackText}) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (exercises.length > 0) {
        content = <ExercisesList exercises={exercises} />;
    }
    return (
        <View style={styles.containter}>
            <ExercisesSummary exercises = {exercises} periodName={exercisesPeriod}/>
             {content}
        </View>
    );
}

export default ExercisesOutput;

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
});  