import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../Features/Project/projectSlice';
import skillReducer from '../Features/Skills/skillsSlice';
import authReducer from '../Features/Auth/authSlice';
import poemsReducer from '../Features/Art/poemSlice'
import experienceReducer from '../Features/Personals/experienceSlice'
import certificateReducer from '../Features/Personals/certificationSlice'
import educationReducer from '../Features/Personals/educationSlice'
import blogReducer from '../Features/Blogs/blogSlice'

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    skills: skillReducer,
    auth: authReducer,
    poems: poemsReducer,
    experience: experienceReducer,
    education: educationReducer,
    certificate: certificateReducer,
    blog: blogReducer,
  },
});
