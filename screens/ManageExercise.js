import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExercisesContext } from '../store/exercises-context';
import ExerciseForm from '../components/ManageExercise/ExerciseForm';
import { storeExercise } from '../util/http';

function ManageExercise({ route, navigation }) {
    const exercisesCtx = useContext(ExercisesContext);

    const editedExerciseId = route.params?.exerciseId;
    const isEditing = !!editedExerciseId;

    const selectedExercise = exercisesCtx.exercises.find(
        exercise => exercise.id === editedExerciseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Exercise' : 'Add Exercise',
        });
    }, [navigation, isEditing]);

    function deleteExerciseHandler() {
        exercisesCtx.deleteExercise(editedExerciseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(exerciseData) {
        if (isEditing) {
            exercisesCtx.updateExercise(editedExerciseId, exerciseData);
        } else {
            storeExercise(exerciseData);
            exercisesCtx.addExercise(exerciseData);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExerciseForm
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
                onCancel={cancelHandler}
                defaultValues={selectedExercise}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExerciseHandler}
                    />
                </View>
            )}
        </View>
    );
}

export default ManageExercise;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});