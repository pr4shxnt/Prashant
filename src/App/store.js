import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../Features/Project/projectSlice';
import skillReducer from '../Features/Skills/skillsSlice'

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    skills: skillReducer,
  },
});
