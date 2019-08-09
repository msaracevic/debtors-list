import {combineReducers} from 'redux';

import debtors from './debtorsReducer';
import modal from './modalReducer';

export default combineReducers({
  debtors,
  modal
});
