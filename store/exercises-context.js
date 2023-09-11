import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Treadmill',
    amount: 42.00,
    date: new Date('2023-09-09'),
  },
  {
    id: 'e2',
    description: 'Treadmill',
    amount: 25.00,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Elliptical',
    amount: 20.00,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'Treadmill',
    amount: 15.00,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'Treadmill',
    amount: 55.00,
    date: new Date('2022-09-01'),
  },
  {
    id: 'e6',
    description: 'Treadmill',
    amount: 45.00,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e7',
    description: 'Elliptical',
    amount: 25.00,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e8',
    description: 'Elliptical',
    amount: 15.00,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e9',
    description: 'Elliptical',
    amount: 25.00,
    date: new Date('2022-09-01'),
  },
];

export const ExercisesContext = createContext({
  exercises: [],
  addExercise: ({ description, amount, date }) => {},
  deleteExercise: (id) => {},
  updateExercise: (id, { description, amount, date }) => {},
});

function exercisesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExerciseIndex = state.findIndex(
        (exercise) => exercise.id === action.payload.id
      );
      const updatableExercise = state[updatableExerciseIndex];
      const updatedItem = { ...updatableExercise, ...action.payload.data };
      const updatedExercises = [...state];
      updatedExercises[updatableExerciseIndex] = updatedItem;
      return updatedExercises;
    case 'DELETE':
      return state.filter((exercise) => exercise.id !== action.payload);
    default:
      return state;
  }
}

function ExercisesContextProvider({ children }) {
  const [exercisesState, dispatch] = useReducer(exercisesReducer, DUMMY_EXPENSES);

  function addExercise(exerciseData) {
    dispatch({ type: 'ADD', payload: exerciseData });
  }

  function deleteExercise(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExercise(id, exerciseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: exerciseData } });
  }

  const value = {
    exercises: exercisesState,
    addExercise: addExercise,
    deleteExercise: deleteExercise,
    updateExercise: updateExercise,
  };

  return (
    <ExercisesContext.Provider value={value}>
      {children}
    </ExercisesContext.Provider>
  );
}

export default ExercisesContextProvider;