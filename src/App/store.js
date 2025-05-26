import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../Features/Project/projectSlice';
import skillReducer from '../Features/Skills/skillsSlice';
import authReducer from '../Features/Auth/authSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    skills: skillReducer,
    auth: authReducer,
  },
});
