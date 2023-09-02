import { combineReducers } from 'redux';
import userAuthReducer from './userAuthReducer';
import projectReducer from './projectReducer';
import searchReducer from './searchReducer';
import viewProjectReducer from './viewProjectReducer';

const myReducer = combineReducers({
  user: userAuthReducer,
  projects: projectReducer,
  searchTerm: searchReducer,
  projectContent: viewProjectReducer
});

export default myReducer;
