import {combineReducers} from 'redux';

import info from './infoReducers';

// all action
const reducers = combineReducers({
  personalInfo: info,
});

export default (state, action) => reducers(state, action);
