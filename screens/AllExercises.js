import { useContext } from "react";
import ExercisesOutput from "../components/ExercisesOutput/ExercisesOutput";
import { ExercisesContext } from "../store/exercises-context";

function AllExercises() {
    const exercisesCtx = useContext(ExercisesContext);
    return <ExercisesOutput
        exercises={exercisesCtx.exercises}
        exercisesPeriod="Total Time"
        fallbackText="No Exercises"
    />;
}

export default AllExercises;