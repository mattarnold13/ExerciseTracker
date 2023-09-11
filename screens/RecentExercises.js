import { useContext } from 'react';

import ExercisesOutput from '../components/ExercisesOutput/ExercisesOutput';
import { ExercisesContext } from '../store/exercises-context';
import { getDateMinusDays } from '../util/date';

function RecentExercises() {
    const exercisesCtx = useContext(ExercisesContext);

    const recentExercises = exercisesCtx.exercises.filter((exercise) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (exercise.date >= date7DaysAgo) && (exercise.date <= today);
    });

    return (
        <ExercisesOutput exercises={recentExercises} 
            exercisesPeriod="Last 7 Days" 
            fallbackText="No Exercises in the last 7 Days" />
    );
}

export default RecentExercises;