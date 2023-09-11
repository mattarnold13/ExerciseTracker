import axios from 'axios';



export function storeExercise(exerciseData) {
    axios.post('http://mattarnold13.com/api/workout',
    exerciseData
    );
}

